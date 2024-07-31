package com.lifetrackhub.service;

import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.RegistrationResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {
    RegistrationResponseDto registration(RegistrationRequestDto request);

    LoginResponseDto login(LoginRequestDto request);
}
