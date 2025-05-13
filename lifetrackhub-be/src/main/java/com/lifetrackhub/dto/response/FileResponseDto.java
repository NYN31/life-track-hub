package com.lifetrackhub.dto.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.MediaType;

@Data
@Builder
public class FileResponseDto {
    private byte[] content;

    private MediaType contentType;
}
