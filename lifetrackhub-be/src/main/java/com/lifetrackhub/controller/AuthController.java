package com.lifetrackhub.controller;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/login")
    public LoginResponseDto login(@RequestBody @Valid LoginRequestDto dto) {
        log.info("Request enter into login controller");
        return authService.login(dto);
    }

    @PostMapping("/auth/registration")
    public UserDto registration(@RequestBody @Valid RegistrationRequestDto dto) {
        log.info("Request enter into registration controller");
        return authService.registration(dto);
    }
}
