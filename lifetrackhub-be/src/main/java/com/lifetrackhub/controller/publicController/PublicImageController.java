package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicImageController extends PublicBaseController{
    private final ImageService imageService;

    public PublicImageController(final ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/image/by-file-path")
    public ResponseEntity<?> getImageByFilePath(@RequestParam("filePath") String filePath) {
        ImageResponseDto dto = imageService.loadImageFileByFilePath(filePath);
        return ResponseEntity
                .ok()
                .contentType(dto.getContentType())
                .body(dto.getContent());
    }
}
