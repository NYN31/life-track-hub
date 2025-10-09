package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.validation.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
@ToString
public class CreateUserRequestDto {
    @NotNull
    @Length(min = 3, max = 40)
    private String firstName;

    @Length(min = 0, max = 40)
    private String lastName;

    @NotNull
    @Length(min = 3, max = 40)
    @Email
    private String email;

    @NotNull
    private Role role;
}
