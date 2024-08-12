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

    @GetMapping("/user/{email}")
    public UserDto findByEmail(@PathVariable String email) {
        log.info("Request enter into user find by email controller");
        User user = userService.findUserByEmail(email);
        return UserDto.formEntity(user);
    }

    @PutMapping("/user/update")
    public UserDto update(@RequestBody @Valid UserDto dto) {
        log.info("Request enter into update user controller");
        User user = userService.update(dto);
        return UserDto.formEntity(user);
    }
}
