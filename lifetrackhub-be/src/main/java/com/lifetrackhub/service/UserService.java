package com.lifetrackhub.service;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void throwIfUserExistByEmail(String email);

    User findUserById(Long userId);

    User findUserByEmail(String email);

    User update(UserDto dto);
}
