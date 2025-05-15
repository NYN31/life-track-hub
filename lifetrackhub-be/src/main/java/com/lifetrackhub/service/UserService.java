package com.lifetrackhub.service;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.UpdatePasswordRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public interface UserService {
    void throwIfUserExistByEmail(String email);

    User findUserById(Long userId);

    User findSelfDetails();

    User findUserByEmail(String email);

    User update(UserDto dto);

    CommonResponseDto updatePassword(UpdatePasswordRequestDto dto);

    Page<User> getUsers(int page, int size, String email, Role role, boolean status, boolean isPremium, LocalDate startDate, LocalDate endDate);

    CommonResponseDto updateRole(String email, Role role);

    CommonResponseDto updateStatus(String email, boolean status);

    CommonResponseDto upgradeAccount(String email, boolean isPremium);
}
