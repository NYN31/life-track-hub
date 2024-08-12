package com.lifetrackhub.service;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserDto registration(RegistrationRequestDto request);

    LoginResponseDto login(LoginRequestDto request);
}
