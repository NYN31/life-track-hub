package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.CommonResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface PasswordReset {
    CommonResponseDto createPasswordResetToken(String email);

    CommonResponseDto resetPassword(String newPassword, String passwordResetToken);
}
