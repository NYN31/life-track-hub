package com.lifetrackhub.dto;

import com.lifetrackhub.entity.Image;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@ToString
public class ImageDto {
    private Long userId;

    private String originalFileName;

    private String filePath;

    private Instant createdDate;

    private Instant lastModifiedDate;

    public static ImageDto formEntity(Image image) {
        ImageDto dto = new ImageDto();
        dto.setUserId(image.getUserId());
        dto.setOriginalFileName(image.getOriginalFileName());
        dto.setFilePath(image.getFilePath());
        dto.setCreatedDate(image.getCreatedDate());
        dto.setLastModifiedDate(image.getLastModifiedDate());

        return dto;
    }
}
