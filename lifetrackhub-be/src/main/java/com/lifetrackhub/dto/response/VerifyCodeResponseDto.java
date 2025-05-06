package com.lifetrackhub.dto.response;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class VerifyCodeResponseDto {
    @JsonAlias("token_type")
    private String tokenType;

    @JsonAlias("access_token")
    private String accessToken;

    @JsonAlias("id_token")
    private String idToken;

    private String scope;

    @JsonAlias("expires_in")
    private Integer expiresIn;

    @JsonAlias("ext_expires_in")
    private Integer extExpiresIn;
}
