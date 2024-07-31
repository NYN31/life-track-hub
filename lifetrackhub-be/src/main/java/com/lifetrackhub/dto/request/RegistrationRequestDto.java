package com.lifetrackhub.dto.request;

import com.lifetrackhub.dto.UserDetails;
import jakarta.validation.constraints.NotNull;

public class RegistrationRequestDto {
    @NotNull
    private String firstname;

    private String lastname;

    @NotNull
    private String email;

    @NotNull
    private String password;

    private UserDetails userDetails;

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserDetails getUserDetailsDto() {
        return userDetails;
    }

    public void setUserDetailsDto(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
