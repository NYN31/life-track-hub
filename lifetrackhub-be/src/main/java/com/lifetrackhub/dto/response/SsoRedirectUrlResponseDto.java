package com.lifetrackhub.dto.response;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SsoRedirectUrlResponseDto {
    private String redirectUrl;
}
