package com.lifetrackhub.dto.request;

import com.lifetrackhub.validation.Email;
import com.lifetrackhub.validation.Password;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public class RegistrationRequestDto {
    @NotNull
    @Length(min = 3, max = 40)
    private String firstname;

    private String lastname;

    @NotNull
    @Length(min = 3, max = 40)
    @Email
    private String email;

    @NotNull
    @Password
    private String password;

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
}
