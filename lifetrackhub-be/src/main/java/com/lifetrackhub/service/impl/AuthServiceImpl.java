package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.LoginType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.*;

@Service
public class AuthServiceImpl implements AuthService {
    private final Logger log = LoggerFactory.getLogger(getClass());

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
    public UserDto registration(RegistrationRequestDto request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            User userInfo = createUser(request, String.valueOf(Role.USER));
            userInfo = userRepository.save(userInfo);
            log.info("User created: {}", userInfo);

            UserVerificationToken token = userVerificationService.createVerificationToken(userInfo, null);
            userVerificationService.sendUserVerifyMail(userInfo.getEmail(), token.getToken());
            log.info("Verification email sent to {}", userInfo.getEmail());

            return UserDto.formEntity(userInfo);
        }

        User user = userOptional.get();
        if (user.getAccountStatus().equals(AccountStatus.DELETED)) {
            log.info("User deleted: {}", user.getEmail());
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Your account has been deleted");
        }

        if (user.getAccountStatus().equals(AccountStatus.INACTIVE)) {
            log.info("User inactive: {}", user.getEmail());

            UserVerificationToken userVerificationToken = userVerificationTokenRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Token not found by user id."));

            if (Instant.now().isBefore(userVerificationToken.getExpirationTime())) {
                log.warn("A account verify link has already sent to your email {} or retry {} hours later", 24, user.getEmail());
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "A account verify link has already sent to your email"
                );
            }

            userVerificationToken = userVerificationService.createVerificationToken(user, userVerificationToken);
            userVerificationService.sendUserVerifyMail(user.getEmail(), userVerificationToken.getToken());
            log.info("Verification email sent to {}", user.getEmail());

            return UserDto.formEntity(user);
        }

        if (user.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            log.info("User already has been exist/active: {}", user.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exist.");
        }

        return null;
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
}
