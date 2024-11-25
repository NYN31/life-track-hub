package com.lifetrackhub.exception;

import com.lifetrackhub.dto.ExceptionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleException(Exception ex) {
        log.info("Unknown exception: {}", ex.getCause());
        ExceptionDto dto = new ExceptionDto(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ExceptionDto> handleException(ResponseStatusException ex) {
        log.info("Global exception: {}", ex.getReason());
        ExceptionDto dto = new ExceptionDto(ex.getStatusCode(), ex.getReason());
        return new ResponseEntity<>(dto, ex.getStatusCode());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDto> handleException(MethodArgumentNotValidException ex) {
        if (ex.getBindingResult().getFieldErrors().isEmpty()) {
            log.warn("Validation exception: {}", ex.getMessage());

            ObjectError objectError = ex.getBindingResult().getAllErrors().get(0);
            ExceptionDto dto = new ExceptionDto(HttpStatus.BAD_REQUEST, objectError.getDefaultMessage());

            return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
        } else {
            FieldError fieldError = ex.getBindingResult().getFieldErrors().get(0);
            String fieldErrorMessage = fieldError.getField() + " " + fieldError.getDefaultMessage();
            ExceptionDto dto = new ExceptionDto(HttpStatus.BAD_REQUEST, fieldErrorMessage);

            if (!"password".equals(fieldError.getField())) {
                log.info("Validation exception: {}", ex.getMessage());
            } else {
                log.info("Validation exception: {}", fieldErrorMessage);
            }
            return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
        }
    }
}
