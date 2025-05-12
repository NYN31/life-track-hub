package com.lifetrackhub.controller;

import com.lifetrackhub.dto.ImageDto;
import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.entity.Image;
import com.lifetrackhub.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageController extends BaseController {
    private final ImageService imageService;

    public ImageController(final ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/image/upload")
    public ImageDto uploadImage(@RequestParam("file") final MultipartFile file) {
        Image image = imageService.saveImage(file);
        return ImageDto.formEntity(image);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<?> getImage(@PathVariable("id") final Long id) {
        ImageResponseDto dto = imageService.loadFileById(id);


        return ResponseEntity.ok().contentType(dto.getContentType()).body(dto.getContent());
    }
}
