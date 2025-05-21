package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.RandomUtil;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.PasswordResetToken;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.PasswordResetTokenRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.MailService;
import com.lifetrackhub.service.PasswordReset;
import com.lifetrackhub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PasswordResetImpl implements PasswordReset {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Value("${reset.token.max.generation.attempts}")
    private int resetTokenMaxAttempts;

    @Value("${reset.token.expiration.time}")
    private int resetTokenExpirationTime;

    @Value("${app.reset.password.redirect.url}")
    private String appResetPasswordRedirectUrl;

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final MailService mailService;

    public PasswordResetImpl(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, PasswordEncoder passwordEncoder, UserService userService, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.mailService = mailService;
    }

    @Override
    public CommonResponseDto createPasswordResetToken(String email) {
        log.info("Creating password reset token for {}", email);

        User user = userService.findUserByEmail(email);

        Instant start = DateUtil.getStartOfCurrentDay();
        Instant end = DateUtil.getEndOfCurrentDay();

        int totalCountsInADay = passwordResetTokenRepository.countByUserIdAndCreatedDateBetween(user.getId(), start, end);

        if (totalCountsInADay < resetTokenMaxAttempts) {
            PasswordResetToken passwordResetToken = generatingPasswordResetToken(user);
            sentPasswordResetMail(user, passwordResetToken.getToken());
            passwordResetTokenRepository.save(passwordResetToken);
            log.info("Created password reset token {} for {}", passwordResetToken.getToken(), user.getEmail());

            return CommonResponseDto.builder().status(HttpStatus.OK).message("An email sent to you account with a link.").build();
        }

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Reset token generation attempts has already been exceed for today and token has already been sent to you email."
        );
    }

    @Override
    public CommonResponseDto resetPassword(String newPassword, String resetToken) {
        log.info("Resetting password token {}", resetToken);

        if (resetToken == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password reset token must not null.");
        }

        boolean isValidToken = passwordResetTokenRepository.isTokenValid(resetToken, Instant.now());
        if (isValidToken) {
            PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(resetToken);

            User user = passwordResetToken.getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            passwordResetToken.setUsed(true);

            userRepository.save(user);
            passwordResetTokenRepository.save(passwordResetToken);
            return CommonResponseDto.builder().status(HttpStatus.OK).message("Password reset has been successful.").build();
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password reset token is invalid.");
    }

    private PasswordResetToken generatingPasswordResetToken(User user) {
        String token = RandomUtil.randomUUIDWithTimestamp();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpirationTime(Instant.now().plusSeconds(resetTokenExpirationTime));

        return passwordResetToken;
    }

    private void sentPasswordResetMail(User user, String token) {
        log.info("Sent password reset mail for {}", user.getEmail());

        String[] to = new String[]{user.getEmail()};

        String subject = "Requested for password reset from lifetrackhub";
        String templatePath = "password-reset-email.html";

        List<File> attachments = new ArrayList<>();
        Map<String, Object> templateVariables = new HashMap<>();

        templateVariables.put("resetLink", getPasswordResetLink(user.getEmail(), token));
        templateVariables.put("expirationTime", getPasswordExpirationTimeInMinutes());

        mailService.sendEmailWithTemplateAsync(to, null, null, templatePath, subject, attachments, templateVariables);
    }

    private String getPasswordExpirationTimeInMinutes() {
        return resetTokenExpirationTime / 60 + " minutes";
    }

    private String getPasswordResetLink(String email, String token) {
        return appResetPasswordRedirectUrl + "?token=" + token + "&email=" + email;
    }
}
