package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.BlogStatus;
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
    private BlogStatus status;

    @NotNull
    private String coverImagePath;

    @NotNull
    private String tags;
}
