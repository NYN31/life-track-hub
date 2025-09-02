package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.TodoStatus;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;

@Data
@ToString
public class TodoSearchRequestDto {
    private int page = 0;

    private int size = 10;

    private String title;

    private TodoStatus status;

    private LocalDate start;

    private LocalDate end;
}
