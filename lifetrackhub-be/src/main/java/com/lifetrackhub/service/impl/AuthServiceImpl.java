package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.LoginType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.entity.UserVerificationToken;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.repository.UserVerificationTokenRepository;
import com.lifetrackhub.service.AuthService;
import com.lifetrackhub.service.JwtService;
import com.lifetrackhub.service.UserVerificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Value("${user.verify.expiration.time}")
    private int resetTokenExpirationTime;

    private final UserRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final JwtService jwtService;
    private final UserVerificationTokenRepository userVerificationTokenRepository;
    private final UserVerificationService userVerificationService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder bCryptPasswordEncoder,
            JwtService jwtService,
            UserVerificationTokenRepository userVerificationTokenRepository,
            UserVerificationService userVerificationService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtService = jwtService;
        this.userVerificationTokenRepository = userVerificationTokenRepository;
        this.userVerificationService = userVerificationService;
    }

    @Override
    public CommonResponseDto registration(RegistrationRequestDto request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            User user = createUser(request, String.valueOf(Role.USER));
            user = userRepository.save(user);
            log.info("User created: {}", user);

            UserVerificationToken token = userVerificationService.createVerificationToken(user, null);
            log.info("Verification token has been created: {}", token.getToken());
            userVerificationService.sendUserVerifyMail(user.getEmail(), token.getToken());

            return CommonResponseDto.builder()
                    .status(HttpStatus.OK)
                    .message("A verification link sent to your account")
                    .build();
        }

        User user = userOptional.get();

        switch (user.getAccountStatus()) {
            case DELETED -> {
                log.info("User deleted: {}", user.getEmail());
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Your account has been deleted");
            }
            case INACTIVE -> {
                handleInactiveUser(user);
                return CommonResponseDto.builder()
                        .status(HttpStatus.OK)
                        .message("Your account is now active.")
                        .build();
            }
            case ACTIVE -> {
                log.info("User already active: {}", user.getEmail());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists.");
            }
            default -> {
                log.warn("Unexpected account status: {} for user {}", user.getAccountStatus(), user.getEmail());
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected account status");
            }
        }
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with email not found"));

        if (user.getAccountStatus() == AccountStatus.DELETED) {
            log.warn("User with email {} is deleted", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User with email " + request.getEmail() + " is deleted.");
        }

        if (user.getAccountStatus() == AccountStatus.INACTIVE) {
            log.warn("User with email {} is inactive", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User with email " + request.getEmail() + " is inactive.");
        }

        if (!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Wrong password for user {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        return createToken(user);
    }

    @Override
    public UserDto createSuperAdmin(RegistrationRequestDto request) {
        Optional<User> user = userRepository.findByRole(String.valueOf(Role.SUPER_ADMIN));
        if (user.isPresent()) {
            log.warn("Super admin user already exists");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Super admin user already exists");
        }

        User userInfo = createUser(request, String.valueOf(Role.SUPER_ADMIN));
        userInfo.setAccountType(AccountType.PREMIUM);
        userInfo = userRepository.save(userInfo);
        log.info("Super admin user created: {}", userInfo);

        return UserDto.formEntity(userInfo);
    }

    @Override
    public LoginResponseDto createToken(User user) {
        String accessToken = jwtService.createToken(user);

        LoginResponseDto response = new LoginResponseDto();
        response.setName(user.getFirstname() + " " + user.getLastname());
        response.setAccessToken(accessToken);

        return response;
    }

    private User createUser(RegistrationRequestDto request, String role) {
        log.info("Create user {}", request.getEmail());

        User user = new User();

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setAccountStatus(AccountStatus.INACTIVE);
        user.setLoginType(LoginType.CREDENTIAL);
        user.setAccountType(AccountType.STANDARD);
        user.setUserDetails(null);

        return user;
    }

    private void handleInactiveUser(User user) {
        UserVerificationToken token = userVerificationTokenRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Token not found by user id."
                ));

        if (Instant.now().isBefore(token.getExpirationTime())) {
            long remainingHours = ChronoUnit.HOURS.between(Instant.now(), token.getExpirationTime());
            log.warn("Account verify link already sent to {}. Verify within {} hours.", user.getEmail(), remainingHours);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Account verify link already has sent to " + user.getEmail() + ". Verify within " + remainingHours + " hours."
            );
        }

        userVerificationService.sendUserVerifyMail(user.getEmail(), token.getToken());
    }
}
