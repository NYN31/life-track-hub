package com.lifetrackhub.controller;

import com.lifetrackhub.dto.ImageDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.entity.Image;
import com.lifetrackhub.service.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
public class ImageController extends BaseController {
    private final ImageService imageService;

    public ImageController(final ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/image/upload")
    public ImageDto uploadImage(@RequestParam("file") final MultipartFile file,
                                HttpServletRequest request) {
        Image image = imageService.uploadImage(file, request);
        return ImageDto.formEntity(image);
    }

    @GetMapping("/image/by-file-path")
    public ResponseEntity<?> getImage(@RequestParam("filePath") String filePath) {
        ImageResponseDto dto = imageService.loadImageFileByFilePath(filePath);
        return ResponseEntity
                .ok()
                .contentType(dto.getContentType())
                .body(dto.getContent());
    }

    @GetMapping("/image/all")
    public PageDto<ImageDto> getImageList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "start", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(value = "end", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
            HttpServletRequest request
    ) {
        Page<Image> images = imageService.getImages(page, size, startDate, endDate);
        return PageDto.fromEntity(images, ImageDto::formEntity);
    }
}
