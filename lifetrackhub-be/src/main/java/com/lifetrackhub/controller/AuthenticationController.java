package com.lifetrackhub.controller;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authentication/login")
    public LoginResponseDto login(@RequestBody @Valid LoginRequestDto dto) {
        return authenticationService.login(dto);
    }

    @PostMapping("/authentication/registration")
    public UserDto registration(@RequestBody @Valid RegistrationRequestDto dto) {
        return authenticationService.registration(dto);
    }
}
