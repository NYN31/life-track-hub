package com.lifetrackhub.dto;

import com.lifetrackhub.dto.blob.UserDetails;
import com.lifetrackhub.entity.User;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public class UserDto extends BaseDto {
    @NotNull
    @Length(min = 3, max = 40)
    private String firstname;

    private String lastname;

    @NotNull
    @Length(min = 3, max = 40)
    private String email;

    private String role;

    private boolean enabled;

    private UserDetails userDetails;

    public static UserDto formEntity(User user) {
        UserDto dto = new UserDto();

        dto.fill(user);
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setEnabled(user.isEnabled());
        dto.setUserDetails(user.getUserDetails());

        return dto;
    }

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    @Override
    public String toString() {
        return "UserUpdateResponseDto{" +
                "firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", enabled='" + enabled + '\'' +
                ", userDetails=" + userDetails +
                '}';
    }
}
