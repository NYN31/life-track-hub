package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.ImageResponseDto;
import com.lifetrackhub.entity.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ImageService {
    Image saveImage(MultipartFile file);

    ImageResponseDto loadFileById(Long id);

    List<Image> getImagesByUserId(Long userId);
}
