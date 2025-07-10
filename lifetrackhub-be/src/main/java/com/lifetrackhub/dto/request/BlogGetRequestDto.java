package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.BlogContentType;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;

@Data
@ToString
public class BlogGetRequestDto {
    private int page = 0;

    private int size = 10;

    private String slug;

    private String email;

    private String visibility = "PUBLIC";

    private BlogContentType blogContentType;

    private LocalDate start;

    private LocalDate end;
}
