package com.lifetrackhub.controller;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController extends BaseController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    public String test() {
        return "Hello World!";
    }

    @GetMapping("/user/{email}")
    public UserDto findByEmail(@PathVariable String email) {
        User user = userService.findUserByEmail(email);
        return UserDto.formEntity(user);
    }

    @PutMapping("/user")
    public UserDto update(@RequestBody @Valid UserDto dto) {
        User user = userService.update(dto);
        return UserDto.formEntity(user);
    }
}
