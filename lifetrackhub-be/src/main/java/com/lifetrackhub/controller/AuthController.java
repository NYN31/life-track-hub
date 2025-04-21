package com.lifetrackhub.controller;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.SsoRedirectUrlResponseDto;
import com.lifetrackhub.service.AuthService;
import com.lifetrackhub.service.GoogleAuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final AuthService authService;
    private final GoogleAuthService googleAuthService;

    public AuthController(AuthService authService, GoogleAuthService googleAuthService) {
        this.authService = authService;
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/auth/login")
    public LoginResponseDto login(@RequestBody @Valid LoginRequestDto dto) {
        return authService.login(dto);
    }

    @PostMapping("/auth/registration")
    public UserDto registration(@RequestBody @Valid RegistrationRequestDto dto) {
        return authService.registration(dto);
    }

    @PostMapping("/auth/create/admin")
    public UserDto createAdmin(@RequestBody @Valid RegistrationRequestDto dto) {
        return authService.createAdmin(dto);
    }

    @PostMapping("/auth/google-url")
    public SsoRedirectUrlResponseDto googlePortalRedirectUrl() {
        return googleAuthService.googleRedirectUrl();
    }

    @PostMapping("/auth/google-callback")
    public LoginResponseDto googleCallback(@RequestParam String code) {
        return googleAuthService.googleLogin(code);
    }
}
