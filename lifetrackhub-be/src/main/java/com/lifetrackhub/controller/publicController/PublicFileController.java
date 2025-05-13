package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.dto.response.FileResponseDto;
import com.lifetrackhub.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicFileController extends PublicBaseController{
    private final FileService fileService;

    public PublicFileController(final FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/file/by-file-path")
    public ResponseEntity<?> getImageByFilePath(@RequestParam("filePath") String filePath) {
        FileResponseDto dto = fileService.loadFileByFilePath(filePath);
        return ResponseEntity
                .ok()
                .contentType(dto.getContentType())
                .body(dto.getContent());
    }
}
