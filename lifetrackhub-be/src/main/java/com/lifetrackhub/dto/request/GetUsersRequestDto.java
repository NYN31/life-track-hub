package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.Role;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;

@Data
@ToString
public class GetUsersRequestDto {
    private int page = 0;

    private int size = 10;

    private String email;

    private Role role;

    private AccountStatus accountStatus;

    private AccountType accountType;

    private LocalDate start;

    private LocalDate end;
}
