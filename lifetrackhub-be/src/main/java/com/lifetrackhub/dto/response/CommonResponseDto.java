package com.lifetrackhub.dto.response;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@Data
@SuperBuilder
public class CommonResponseDto {
    private String message;
    private HttpStatus status;
}
