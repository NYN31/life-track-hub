package com.lifetrackhub.dto.request;

import com.lifetrackhub.validation.Password;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequestDto {
    @NotNull
    @Password
    private String oldPassword;

    @NotNull
    @Password
    private String newPassword;
}
