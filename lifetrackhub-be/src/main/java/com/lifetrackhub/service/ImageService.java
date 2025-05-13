package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.entity.Image;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Service
public interface ImageService {
    Image uploadImage(MultipartFile file, HttpServletRequest request);

    ImageResponseDto loadImageFileByFilePath(String filePath);

    Page<Image> getImages(int page, int size, LocalDate startDate, LocalDate endDate);
}
