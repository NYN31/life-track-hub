package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.entity.UserVerificationToken;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.repository.UserVerificationTokenRepository;
import com.lifetrackhub.service.MailService;
import com.lifetrackhub.service.UserVerificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserVerificationServiceImpl implements UserVerificationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Value("${user.verify.expiration.time}")
    private int resetTokenExpirationTime;

    @Value("${app.user.verify.redirect.url}")
    private String appUserVerifyRedirectUrl;

    private final UserVerificationTokenRepository userVerificationTokenRepository;
    private final MailService mailService;
    private final UserRepository userRepository;

    public UserVerificationServiceImpl(
            UserVerificationTokenRepository userVerificationTokenRepository,
            MailService mailService,
            UserRepository userRepository) {
        this.userVerificationTokenRepository = userVerificationTokenRepository;
        this.mailService = mailService;
        this.userRepository = userRepository;
    }

    @Override
    public UserVerificationToken createVerificationToken(User user, UserVerificationToken userVerificationToken) {
        log.info("Create verification token for user: {}", user.getEmail());

        String token = UUID.randomUUID().toString();

        if (userVerificationToken != null) {
            log.info("Verification token already exists for user: {}", user.getEmail());

            userVerificationToken.setToken(token);
            userVerificationToken.setExpirationTime(
                    Instant.now().plus(resetTokenExpirationTime, ChronoUnit.HOURS)
            );
            return userVerificationTokenRepository.save(userVerificationToken);
        }

        log.info("New verification token for user: {}", user.getEmail());
        UserVerificationToken verificationToken = new UserVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpirationTime(
                Instant.now().plus(resetTokenExpirationTime, ChronoUnit.HOURS)
        );

        return userVerificationTokenRepository.save(verificationToken);
    }

    @Override
    public CommonResponseDto verifyUser(String token, String email) {
        UserVerificationToken verificationToken = userVerificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid token."));

        if (verificationToken.getExpirationTime().isBefore(Instant.now())) {
            log.warn("Verification token expired for user: {}", verificationToken.getUser().getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token has been expired");
        }

        if (!verificationToken.getUser().getEmail().equals(email)) {
            log.warn("Verification token does not match user email: {}", verificationToken.getUser().getEmail());
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid email");
        }

        User user = verificationToken.getUser();
        user.setAccountStatus(AccountStatus.ACTIVE);
        userRepository.save(user);

        return CommonResponseDto.builder()
                .status(HttpStatus.OK)
                .message("User has been verified")
                .build();
    }

    @Override
    public void sendUserVerifyMail(String email, String token) {
        log.info("User verify mail sending for {}", email);

        String[] to = new String[]{email};
        String subject = "Verify your account at lifetrackhub";
        String templatePath = "user-verify-email.html";

        Map<String, Object> templateVariables = new HashMap<>();
        templateVariables.put("verifyLink", getUserVerifyLink(token));
        templateVariables.put("expirationTime", getTokenExpirationTimeInMinutes());

        mailService.sendEmailWithTemplateAsync(
                to,
                null,
                null,
                templatePath,
                subject,
                null,
                templateVariables
        );
        log.info("Verification email sent to {}", email);
    }

    private String getTokenExpirationTimeInMinutes() {
        return resetTokenExpirationTime + " hours";
    }

    private String getUserVerifyLink(String token) {
        log.info("Your user verify redirect URL: {}?token={}", appUserVerifyRedirectUrl, token);
        return appUserVerifyRedirectUrl + "?token=" + token;
    }
}
