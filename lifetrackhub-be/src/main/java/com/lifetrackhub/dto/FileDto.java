package com.lifetrackhub.dto;

import com.lifetrackhub.constant.enumeration.FileType;
import com.lifetrackhub.entity.File;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@ToString
public class FileDto {
    private Long userId;

    private FileType fileType;

    private String originalFileName;

    private String filePath;

    private String previewUrl;

    private Instant createdDate;

    private Instant lastModifiedDate;

    public static FileDto formEntity(File file) {
        FileDto dto = new FileDto();
        dto.setUserId(file.getUserId());
        dto.setFileType(file.getFileType());
        dto.setOriginalFileName(file.getOriginalFileName());
        dto.setFilePath(file.getFilePath());
        dto.setPreviewUrl(file.getPreviewUrl());
        dto.setCreatedDate(file.getCreatedDate());
        dto.setLastModifiedDate(file.getLastModifiedDate());

        return dto;
    }
}
