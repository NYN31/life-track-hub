package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.SsoRedirectUrlResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface GoogleAuthService {
    SsoRedirectUrlResponseDto googleRedirectUrl();

    LoginResponseDto googleLogin(String code);
}
