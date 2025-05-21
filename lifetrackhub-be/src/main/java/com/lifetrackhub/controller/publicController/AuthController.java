package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.LoginRequestDto;
import com.lifetrackhub.dto.request.RegistrationRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.SsoRedirectUrlResponseDto;
import com.lifetrackhub.service.AuthService;
import com.lifetrackhub.service.GoogleAuthService;
import com.lifetrackhub.service.PasswordReset;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final AuthService authService;
    private final GoogleAuthService googleAuthService;
    private final PasswordReset passwordReset;

    public AuthController(
            AuthService authService,
            GoogleAuthService googleAuthService,
            PasswordReset passwordReset
    ) {
        this.authService = authService;
        this.googleAuthService = googleAuthService;
        this.passwordReset = passwordReset;
    }

    @PostMapping("/auth/login")
    public LoginResponseDto login(@RequestBody @Valid LoginRequestDto dto) {
        return authService.login(dto);
    }

    @PostMapping("/auth/registration")
    public UserDto registration(@RequestBody @Valid RegistrationRequestDto dto) {
        return authService.registration(dto);
    }

    @PostMapping("/auth/create/super-admin")
    public UserDto createAdmin(@RequestBody @Valid RegistrationRequestDto dto) {
        return authService.createSuperAdmin(dto);
    }

    @PostMapping("/auth/google-url")
    public SsoRedirectUrlResponseDto googlePortalRedirectUrl() {
        return googleAuthService.googleRedirectUrl();
    }

    @PostMapping("/auth/google-callback")
    public LoginResponseDto googleCallback(@RequestParam String code) {
        return googleAuthService.googleLogin(code);
    }

    @PostMapping("/auth/create/reset-password-token")
    public CommonResponseDto createResetPasswordToken(@RequestParam(value = "email") String email) {
        return passwordReset.createPasswordResetToken(email);
    }

    @PostMapping("/auth/reset/password")
    public CommonResponseDto resetPassword(
            @RequestParam(value = "newPassword") String newPassword,
            @RequestParam(value = "resetPasswordToken") String resetPasswordToken
    ) {
        return passwordReset.resetPassword(newPassword, resetPasswordToken);
    }
}
