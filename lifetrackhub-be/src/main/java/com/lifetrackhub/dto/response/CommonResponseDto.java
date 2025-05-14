package com.lifetrackhub.dto.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class CommonResponseDto {
    private String message;
    private HttpStatus status;
}
