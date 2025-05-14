package com.lifetrackhub.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequestDto {
    @NotNull
    private String oldPassword;

    @NotNull
    private String newPassword;
}
