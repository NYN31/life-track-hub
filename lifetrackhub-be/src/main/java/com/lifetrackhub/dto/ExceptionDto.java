package com.lifetrackhub.dto;

import org.springframework.http.HttpStatusCode;

public class ExceptionDto {
    private HttpStatusCode status;

    private String message;

    public ExceptionDto() {
    }

    public ExceptionDto(HttpStatusCode status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatusCode getStatus() {
        return status;
    }

    public void setStatus(HttpStatusCode status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
