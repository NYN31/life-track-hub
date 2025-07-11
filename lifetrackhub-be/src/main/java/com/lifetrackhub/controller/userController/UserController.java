package com.lifetrackhub.controller.userController;

import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.request.UpdatePasswordRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
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

    @GetMapping("/user/test")
    public String test() {
        return "Hello World!";
    }

    @GetMapping("/user/find-by-email/{email}")
    public UserDto findByEmail(@PathVariable String email) {
        User user = userService.findUserByEmail(email);
        return UserDto.formEntity(user);
    }

    @GetMapping("/user/find-self-details/{email}")
    public UserDto findSelfDetails(@PathVariable String email) {
        User user = userService.findSelfDetails();
        return UserDto.formEntity(user);
    }

    @PutMapping("/user/update")
    public UserDto update(@RequestBody @Valid UserDto dto) {
        User user = userService.update(dto);
        return UserDto.formEntity(user);
    }

    @PutMapping("/user/password/update")
    public CommonResponseDto updatePassword(@RequestBody @Valid UpdatePasswordRequestDto dto) {
        return userService.updatePassword(dto);
    }
}
