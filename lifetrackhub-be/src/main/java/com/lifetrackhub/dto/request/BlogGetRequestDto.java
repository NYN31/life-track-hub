package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.BlogStatus;
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

    private String keywords;

    private BlogStatus status;

    private LocalDate start;

    private LocalDate end;
}
