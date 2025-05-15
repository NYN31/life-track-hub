package com.lifetrackhub.controller.superAdminController;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class SuperAdminUserController extends SuperAdminBaseController {
    private final UserService userService;

    public SuperAdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/all")
    public PageDto<UserDto> getUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "role", required = false) Role role,
            @RequestParam(value = "status", defaultValue = "true", required = false) boolean status,
            @RequestParam(value = "isPremium", defaultValue = "false", required = false) boolean isPremium,
            @RequestParam(value = "start", required = false) LocalDate start,
            @RequestParam(value = "end", required = false) LocalDate end) {
        Page<User> users = userService.getUsers(page, size, email, role, status, isPremium, start, end);
        return PageDto.fromEntity(users, UserDto::formEntity);
    }

    @PutMapping("/user/update/role/{email}/{role}")
    public CommonResponseDto updateRole(@PathVariable String email, @PathVariable Role role) {
        return userService.updateRole(email, role);
    }

    @PutMapping("/user/update/status/{email}/{status}")
    public CommonResponseDto updateStatus(@PathVariable String email, @PathVariable boolean status) {
        return userService.updateStatus(email, status);
    }

    @PutMapping("/user/update/upgrade-account/{email}/{isPremium}")
    public CommonResponseDto updateAccount(@PathVariable String email, @PathVariable boolean isPremium) {
        return userService.upgradeAccount(email, isPremium);
    }
}
