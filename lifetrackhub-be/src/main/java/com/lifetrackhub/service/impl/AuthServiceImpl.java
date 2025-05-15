package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.LoginType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.AuthService;
import com.lifetrackhub.service.JwtService;
import com.lifetrackhub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UserRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthServiceImpl(
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
    public UserDto registration(RegistrationRequestDto request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent()) {
            log.warn("User with email {} already exists", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User already exists");
        }

        User userInfo = createUser(request, String.valueOf(Role.USER));
        userInfo = userRepository.save(userInfo);
        log.info("User created: {}", userInfo);

        return UserDto.formEntity(userInfo);
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        User user = userService.findUserByEmail(request.getEmail());
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
        user.setEnabled(true);
        user.setLoginType(LoginType.CREDENTIAL);
        user.setPremiumUser(true);
        user.setUserDetails(null);

        return user;
    }
}
