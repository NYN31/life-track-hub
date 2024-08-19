package com.lifetrackhub.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class FilterChainExceptionAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final ObjectMapper objectMapper;

    public FilterChainExceptionAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        log.info("Filter chain exception authentication entry point");
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (authException instanceof InsufficientAuthenticationException) {
            status = HttpStatus.FORBIDDEN;
        }
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        byte[] responseBody = objectMapper.writeValueAsBytes(buildErrorDto(status, request.getRequestURI()));

        OutputStream responseStream = response.getOutputStream();
        responseStream.write(responseBody);
        responseStream.flush();
    }

    private Map<String, Object> buildErrorDto(HttpStatus status, String path) {
        Map<String, Object> errorDto = new LinkedHashMap<>();
        errorDto.put("timestamp", Instant.now());
        errorDto.put("status", status.value());
        errorDto.put("error", status.getReasonPhrase());
        errorDto.put("path", path);

        return errorDto;
    }
}
