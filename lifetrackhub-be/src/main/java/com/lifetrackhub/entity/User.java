package com.lifetrackhub.entity;

import com.lifetrackhub.dto.blob.UserDetails;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class User extends BaseEntity {
    @NotNull
    private String firstname;

    private String lastname;

    @NotNull
    private String email;

    @NotNull
    private String password;

    private String role;

    @NotNull
    private boolean enabled;

    private UserDetails userDetails;

    public @NotNull String getFirstname() {
        return firstname;
    }

    public void setFirstname(@NotNull String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public @NotNull String getEmail() {
        return email;
    }

    public void setEmail(@NotNull String email) {
        this.email = email;
    }

    public @NotNull String getPassword() {
        return password;
    }

    public void setPassword(@NotNull String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @NotNull
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(@NotNull boolean enabled) {
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
        return "User{" +
                "firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", enabled=" + enabled +
                ", userDetails=" + userDetails +
                '}' + super.toString();
    }
}
