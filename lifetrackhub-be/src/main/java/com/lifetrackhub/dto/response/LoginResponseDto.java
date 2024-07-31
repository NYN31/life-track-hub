package com.lifetrackhub.dto.response;

import com.lifetrackhub.dto.BaseDto;

public class LoginResponseDto {
    private String name;

    private String accessToken;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "LoginResponseDto{" +
                "name='" + name + '\'' +
                '}';
    }
}
