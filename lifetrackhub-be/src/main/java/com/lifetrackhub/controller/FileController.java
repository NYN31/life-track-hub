package com.lifetrackhub.controller;

import com.lifetrackhub.constant.enumeration.FileType;
import com.lifetrackhub.dto.FileDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.entity.File;
import com.lifetrackhub.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
public class FileController extends BaseController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/file/upload")
    public FileDto uploadFile(@RequestParam("file") final MultipartFile multipartFile,
                              HttpServletRequest request) {
        File file = fileService.uploadFile(multipartFile, request);
        return FileDto.formEntity(file);
    }

    @GetMapping("/file/all")
    public PageDto<FileDto> findFileList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "fileType", defaultValue = "PDF") FileType fileType,
            @RequestParam(value = "start", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(value = "end", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        Page<File> files = fileService.getFiles(page, size, fileType, startDate, endDate);
        return PageDto.fromEntity(files, FileDto::formEntity);
    }
}
