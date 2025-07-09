package com.lifetrackhub.dto.request;

import com.lifetrackhub.constant.enumeration.BlogContentType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BlogUpdateRequestDto {
    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private String visibility;

    @NotNull
    private String coverImagePath;

    @NotNull
    private String tags;

    @NotNull
    private String slug;

    @NotNull
    private BlogContentType blogContentType;
}
