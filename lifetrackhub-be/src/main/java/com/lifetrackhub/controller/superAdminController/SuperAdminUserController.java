package com.lifetrackhub.controller.superAdminController;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.request.GetUsersRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.UserResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class SuperAdminUserController extends SuperAdminBaseController {
    private final UserService userService;

    public SuperAdminUserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/all")
    public PageDto<UserResponseDto> getUsers(@RequestBody @Valid GetUsersRequestDto dto) {
        Page<User> users = userService.getUsers(dto);
        return PageDto.fromEntity(users, UserResponseDto::formEntity);
    }

    @PutMapping("/user/update/role/{email}/{role}")
    public CommonResponseDto updateRole(@PathVariable String email, @PathVariable Role role) {
        return userService.updateRole(email, role);
    }

    @PutMapping("/user/update/status/{email}/{accountStatus}")
    public CommonResponseDto updateStatus(@PathVariable String email, @PathVariable AccountStatus accountStatus) {
        return userService.updateStatus(email, accountStatus);
    }

    @PutMapping("/user/update/upgrade-account/{email}/{accountType}")
    public CommonResponseDto updateAccount(@PathVariable String email, @PathVariable AccountType accountType) {
        return userService.upgradeAccount(email, accountType);
    }
}
