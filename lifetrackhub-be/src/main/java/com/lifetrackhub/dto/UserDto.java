package com.lifetrackhub.dto;

import com.lifetrackhub.entity.User;

public class UserDto extends BaseDto {
    private String firstname;

    private String lastname;

    private String email;

    private String role;

    private UserDetails userDetails;

    public static UserDto formEntity(User user) {
        UserDto dto = new UserDto();

        dto.fill(user);
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
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
                ", userDetails=" + userDetails +
                '}';
    }
}
