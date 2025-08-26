package com.lifetrackhub.service;

import com.lifetrackhub.constant.enumeration.FileType;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.FileResponseDto;
import com.lifetrackhub.entity.File;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Service
public interface FileService {
    File uploadFile(MultipartFile file, HttpServletRequest request);

    FileResponseDto loadFileByFilePath(String filePath);

    Page<File> getFiles(int page, int size, FileType fileType, LocalDate startDate, LocalDate endDate);

    CommonResponseDto deleteFileByFilePath(String filePath);
}
