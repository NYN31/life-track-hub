package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.entity.Image;
import com.lifetrackhub.repository.ImageRepository;
import com.lifetrackhub.service.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final ImageRepository imageRepository;

    @Value("${upload.dir}")
    private String uploadDir;

    public ImageServiceImpl(final ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public Image uploadImage(MultipartFile file, HttpServletRequest request) {
        log.info("Image original file name {}", file.getOriginalFilename());

        String originalName = file.getOriginalFilename();
        if (originalName == null || originalName.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid image file");
        }
        String extension = originalName.substring(originalName.lastIndexOf(".") + 1);

        Path path = getImagePath(extension);
        fileTransferToUploadDirectory(file, path);
        String previewUrl = getImagePreviewUrl(request, path.toString());

        return createAndSaveImage(originalName, path, previewUrl);
    }

    @Override
    public ImageResponseDto loadImageFileByFilePath(String filePath) {
        Optional<Image> optionalImage = imageRepository.findByFilePath(filePath);
        if (optionalImage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found");
        }

        Image image = optionalImage.get();
        log.info("Loading image {}", image.getFilePath());

        return ImageResponseDto
                .builder()
                .content(readImageContentInByte(image))
                .contentType(getContentType(image))
                .build();
    }

    @Override
    public Page<Image> getImages(int page, int size, LocalDate startDate, LocalDate endDate) {
        log.info("Getting images from {} to {}", startDate, endDate);

        Long userId = Util.getUserFromSecurityContextHolder().getId();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        int DATE_RANGE_PERIOD_FOR_IMAGE_SEARCH = 30;
        if (startDate == null || endDate == null) {
            startDate = LocalDate.now().minusDays(DATE_RANGE_PERIOD_FOR_IMAGE_SEARCH);
            endDate = LocalDate.now();
        }

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);
        Period period = Period.between(startDate, endDate);

        log.info("Start date: {} End date: {} Difference: {}", start, end, period.getDays());
        if (period.getDays() > DATE_RANGE_PERIOD_FOR_IMAGE_SEARCH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date range should be in between 30 days");
        }

        return imageRepository.findAllByUserIdAndCreatedDateBetween(userId, start, end, pageable);
    }

    private Path getImagePath(String extension) {
        try {
            Path homePath = Path.of(System.getProperty("user.home"));
            Path basePath = homePath.resolve(uploadDir);
            Files.createDirectories(basePath);

            return basePath.resolve(getImageFilename(extension.toLowerCase()));
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    private void fileTransferToUploadDirectory(MultipartFile file, Path path) {
        try {
            file.transferTo(path);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid image file");
        }
    }

    private Image createAndSaveImage(String originalName, Path path, String previewUrl) {
        Long userId = Util.getUserFromSecurityContextHolder().getId();

        Image image = new Image();
        image.setUserId(userId);
        image.setOriginalFileName(originalName);
        image.setFilePath(path.toString());
        image.setPreviewUrl(previewUrl);
        log.info("Saving image {}", image);

        return imageRepository.save(image);
    }

    private String getImageFilename(String extension) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        return String.format("IMG_%s.%s", formatter.format(LocalDateTime.now()), extension);
    }

    private MediaType getContentType(Image image) {
        String path = image.getFilePath();
        String extension = path.substring(path.lastIndexOf(".") + 1);

        return switch (extension.toLowerCase()) {
            case "png" -> MediaType.IMAGE_PNG;
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "gif" -> MediaType.IMAGE_GIF;
            default -> throw new IllegalStateException("Unsupported image format");
        };
    }

    private String getImagePreviewUrl(HttpServletRequest request, String path) {
        String baseUrl = request.getRequestURL().toString()
                .replace(request.getRequestURI(), request.getContextPath());
        String endPoint = "/public/api/image/by-file-path";
        return baseUrl + endPoint + "?filePath=" + path;
    }

    private byte[] readImageContentInByte(Image image) {
        try {
            return Files.readAllBytes(Path.of(image.getFilePath()));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
