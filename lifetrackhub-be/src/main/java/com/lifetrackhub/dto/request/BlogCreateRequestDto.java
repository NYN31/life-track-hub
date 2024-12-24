package com.lifetrackhub.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BlogCreateRequestDto {
    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private String visibility;
}
