package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.entity.Image;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.ImageRepository;
import com.lifetrackhub.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
    public Image saveImage(MultipartFile file) {
        log.info("Saving image to " + file.getOriginalFilename());

        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        String originalName = file.getOriginalFilename();
        if (originalName == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid image file");
        }
        String extension = originalName.substring(originalName.lastIndexOf(".") + 1);

        Path path;
        try {
            Path homePath = Path.of(System.getProperty("user.home"));
            Path basePath = homePath.resolve(uploadDir);
            Files.createDirectories(basePath);

            path = basePath.resolve(getImageFilename(extension.toLowerCase()));
            file.transferTo(path);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }

        Image image = new Image();
        image.setUserId(userFromSecurityContext.getId());
        image.setOriginalFileName(originalName);
        image.setFilePath(path.toString());

        return imageRepository.save(image);
    }

    @Override
    public ImageResponseDto loadFileById(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found"));
        try {
            log.info("Loading image " + image.getFilePath());

            return ImageResponseDto
                    .builder()
                    .content(Files.readAllBytes(Path.of(image.getFilePath())))
                    .contentType(switch (image.getFilePath().substring(image.getFilePath().lastIndexOf(".") + 1)) {
                        case "png" -> MediaType.IMAGE_PNG;
                        case "jpg" -> MediaType.IMAGE_JPEG;
                        default -> throw new IllegalStateException("Unsupported image format");
                    })
                    .build();
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

    @Override
    public List<Image> getImagesByUserId(Long userId) {
        return imageRepository.findAllByUserId(userId);
    }

    private String getImageFilename(String extension) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        return String.format("IMG_%s.%s", formatter.format(LocalDateTime.now()), extension);
    }
}
