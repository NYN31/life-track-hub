package com.lifetrackhub.controller;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController extends BaseController {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/test")
    public String test() {
        return "Hello World!";
    }

    @GetMapping("/user/find-by-email/{email}")
    public UserDto findByEmail(@PathVariable String email) {
        User user = userService.findUserByEmail(email);
        return UserDto.formEntity(user);
    }

    @GetMapping("/user/find-self-details")
    public UserDto findSelfDetails() {
        User user = userService.findSelfDetails();
        return UserDto.formEntity(user);
    }

    @PutMapping("/user/update")
    public UserDto update(@RequestBody @Valid UserDto dto) {
        User user = userService.update(dto);
        return UserDto.formEntity(user);
    }
}
