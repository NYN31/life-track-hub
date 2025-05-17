package com.lifetrackhub.dto;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.LoginType;
import com.lifetrackhub.dto.blob.UserDetails;
import com.lifetrackhub.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import java.time.Instant;

@Data
@ToString
public class UserDto {
    @NotNull
    @Length(min = 3, max = 40)
    private String firstname;

    private String lastname;

    @NotNull
    @Length(min = 3, max = 40)
    private String email;

    private String role;

    private LoginType loginType;

    private AccountStatus accountStatus;

    private AccountType accountType;

    private UserDetails userDetails;

    private Instant createdDate;

    private Instant lastModifiedDate;

    public static UserDto formEntity(User user) {
        UserDto dto = formEntityWithoutDetails(user);
        dto.setUserDetails(user.getUserDetails());
        dto.setCreatedDate(user.getCreatedDate());
        dto.setLastModifiedDate(user.getLastModifiedDate());

        return dto;
    }

    public static UserDto formEntityWithoutDetails(User user) {
        UserDto dto = new UserDto();

        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setAccountStatus(user.getAccountStatus());
        dto.setLoginType(user.getLoginType());
        dto.setAccountType(user.getAccountType());

        return dto;
    }
}
