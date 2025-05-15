package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.FileType;
import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.response.FileResponseDto;
import com.lifetrackhub.entity.File;
import com.lifetrackhub.repository.FileRepository;
import com.lifetrackhub.service.FileService;
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
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final FileRepository fileRepository;

    @Value("${upload.image.dir}")
    private String uploadImageDir;

    @Value("${upload.pdf.dir}")
    private String uploadPdfDir;

    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public File uploadFile(MultipartFile file, HttpServletRequest request) {
        log.info("File original file name {}", file.getOriginalFilename());

        String originalName = file.getOriginalFilename();
        if (originalName == null || originalName.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file name");
        }
        String extension = originalName.substring(originalName.lastIndexOf(".") + 1);

        Path path = getFilePath(extension);
        fileTransferToUploadDirectory(file, path);
        String previewUrl = getFilePreviewUrl(request, path.toString());

        return createAndSaveFile(originalName, path, previewUrl, extension);
    }

    @Override
    public FileResponseDto loadFileByFilePath(String filePath) {
        Optional<File> optionalFile = fileRepository.findByFilePath(filePath);
        if (optionalFile.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }

        File file = optionalFile.get();
        log.info("Loading file {}", file.getFilePath());

        return FileResponseDto
                .builder()
                .content(readFileContentInByte(file))
                .contentType(getContentType(file))
                .build();
    }

    @Override
    public Page<File> getFiles(int page, int size, FileType fileType, LocalDate startDate, LocalDate endDate) {
        log.info("Getting files from {} to {}", startDate, endDate);

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
        long days = ChronoUnit.DAYS.between(start, end);

        log.info("Start date: {} End date: {} Difference: {}", start, end, days);
        if (days > DATE_RANGE_PERIOD_FOR_IMAGE_SEARCH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date range should be in between 30 days");
        }

        return fileRepository.findAllByUserIdAndFileTypeAndCreatedDateBetween(userId, fileType, start, end, pageable);
    }

    private Path getFilePath(String extension) {
        try {
            Path homePath = Path.of(System.getProperty("user.home"));
            Path basePath = homePath.resolve(getUploadDirectory(extension));
            Files.createDirectories(basePath);

            return basePath.resolve(getFilename(extension.toLowerCase()));
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    private void fileTransferToUploadDirectory(MultipartFile file, Path path) {
        try {
            file.transferTo(path);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File transfer to upload directory has been failed.");
        }
    }

    private String getFilePreviewUrl(HttpServletRequest request, String path) {
        String baseUrl = request.getRequestURL().toString()
                .replace(request.getRequestURI(), request.getContextPath());
        String endPoint = "/public/api/file/by-file-path";
        return baseUrl + endPoint + "?filePath=" + path;
    }

    private File createAndSaveFile(String originalName, Path path, String previewUrl, String extension) {
        Long userId = Util.getUserFromSecurityContextHolder().getId();

        File file = new File();
        file.setUserId(userId);
        file.setFileType(getFileTypeFromExtension(extension));
        file.setOriginalFileName(originalName);
        file.setFilePath(path.toString());
        file.setPreviewUrl(previewUrl);
        log.info("Saving file {}", file);

        return fileRepository.save(file);
    }

    private FileType getFileTypeFromExtension(String extension) {
        return switch (extension) {
            case "pdf" -> FileType.PDF;
            case "jpg", "jpeg", "png" -> FileType.IMG;
            default -> throw new IllegalStateException("Unexpected value: " + extension);
        };
    }

    private String getUploadDirectory(String extension) {
        return switch (extension) {
            case "pdf" -> uploadPdfDir;
            case "jpg", "jpeg", "png" -> uploadImageDir;
            default -> throw new IllegalStateException("Unexpected value: " + extension);
        };
    }

    private String getFilename(String extension) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        String formatterStringPrefix = getFileTypeFromExtension(extension).toString();

        return String.format("%s_%s.%s", formatterStringPrefix, formatter.format(LocalDateTime.now()), extension);
    }

    private MediaType getContentType(File file) {
        String path = file.getFilePath();
        String extension = path.substring(path.lastIndexOf(".") + 1);

        return switch (extension.toLowerCase()) {
            case "png" -> MediaType.IMAGE_PNG;
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "gif" -> MediaType.IMAGE_GIF;
            case "pdf" -> MediaType.APPLICATION_PDF;
            default -> throw new IllegalStateException("Unsupported file format");
        };
    }

    private byte[] readFileContentInByte(File file) {
        try {
            return Files.readAllBytes(Path.of(file.getFilePath()));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
