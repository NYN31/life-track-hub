package com.lifetrackhub.dto.response;

import com.lifetrackhub.dto.BaseDto;
import com.lifetrackhub.entity.User;

public class RegistrationResponseDto extends BaseDto {

    private String name;

    private String email;

    public static RegistrationResponseDto formEntity(User entity) {
        RegistrationResponseDto dto = new RegistrationResponseDto();

        dto.fill(entity);
        dto.setName(entity.getFirstname() + " " + entity.getLastname());
        dto.setEmail(entity.getEmail());

        return dto;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "RequestResponseDto{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
