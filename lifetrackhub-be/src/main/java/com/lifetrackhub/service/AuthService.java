package com.lifetrackhub.service;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.SsoRedirectUrlResponseDto;
import com.lifetrackhub.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserDto registration(RegistrationRequestDto request);

    LoginResponseDto login(LoginRequestDto request);

    UserDto createAdmin(RegistrationRequestDto request);

    LoginResponseDto createToken(User user);
}
