package com.lifetrackhub.dto.response;

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
import java.util.Optional;

@Data
@ToString
public class UserResponseDto {
    private String name;

    @NotNull
    @Length(min = 3, max = 40)
    private String email;

    private String role;

    private LoginType loginType;

    private AccountStatus accountStatus;

    private AccountType accountType;

    private String profileImagePath;

    private Instant createdDate;

    private Instant lastModifiedDate;

    public static UserResponseDto formEntity(User user) {
        UserResponseDto dto = new UserResponseDto();

        dto.setRole(user.getRole());
        dto.setName(user.getFirstname() +  " " + user.getLastname());
        dto.setEmail(user.getEmail());
        dto.setAccountStatus(user.getAccountStatus());
        dto.setLoginType(user.getLoginType());
        dto.setAccountType(user.getAccountType());
        dto.setProfileImagePath(
                Optional.ofNullable(user.getUserDetails())
                        .map(UserDetails::getProfileImagePath)
                        .orElse(null)

        );
        dto.setCreatedDate(user.getCreatedDate());
        dto.setLastModifiedDate(user.getLastModifiedDate());

        return dto;
    }
}
