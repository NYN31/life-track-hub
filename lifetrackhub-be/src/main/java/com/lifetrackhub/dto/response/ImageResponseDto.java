package com.lifetrackhub.dto.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.MediaType;

@Data
@Builder
public class ImageResponseDto {
    private byte[] content;

    private MediaType contentType;
}
