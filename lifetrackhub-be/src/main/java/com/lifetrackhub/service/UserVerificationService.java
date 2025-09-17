package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.entity.UserVerificationToken;
import org.springframework.stereotype.Service;

@Service
public interface UserVerificationService {
    UserVerificationToken createVerificationToken(User user, UserVerificationToken userVerificationToken);

    CommonResponseDto verifyUser(String token, String email);

    void sendUserVerifyMail(String email, String token);

}
