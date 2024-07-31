package com.lifetrackhub.exception;

import com.lifetrackhub.dto.ExceptionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleException(Exception ex) {
        log.info("Global exception occur: {}", ex.getMessage());
        ExceptionDto exceptionDto = new ExceptionDto();
        exceptionDto.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        exceptionDto.setMessage(ex.getMessage());

        return new ResponseEntity<>(exceptionDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ExceptionDto> handleException(ResponseStatusException ex) {
        log.info("Expected exception: {}", ex.getReason());
        ExceptionDto dto = new ExceptionDto(ex.getStatusCode(), ex.getReason());
        return new ResponseEntity<>(dto, ex.getStatusCode());
    }
}
