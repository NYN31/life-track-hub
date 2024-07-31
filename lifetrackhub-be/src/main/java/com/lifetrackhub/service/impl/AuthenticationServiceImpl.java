package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.RegistrationResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.AuthenticationService;
import com.lifetrackhub.service.JwtService;
import com.lifetrackhub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UserRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthenticationServiceImpl(
            UserRepository userRepository,
            PasswordEncoder bCryptPasswordEncoder,
            UserService userService,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Override
    public RegistrationResponseDto registration(RegistrationRequestDto request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent()) {
            log.warn("User with email {} already exists", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User already exists");
        }

        User userInfo = createUser(request);
        userInfo = userRepository.save(userInfo);
        log.info("User created: {}", userInfo);

        return RegistrationResponseDto.formEntity(userInfo);
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        User user = userService.findUserByEmail(request.getEmail());
        if(!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Wrong password for user {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        return createToken(user);
    }

    private LoginResponseDto createToken(User user) {
        String accessToken = jwtService.createToken(user);

        LoginResponseDto response = new LoginResponseDto();
        response.setName(user.getFirstname() + " " + user.getLastname());
        response.setAccessToken(accessToken);

        return response;
    }

    public User createUser(RegistrationRequestDto request) {
        log.info("Create user {}", request.getEmail());

        User user = new User();

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setRole(String.valueOf(Role.USER));
        user.setUserDetails(null);

        return user;
    }
}
