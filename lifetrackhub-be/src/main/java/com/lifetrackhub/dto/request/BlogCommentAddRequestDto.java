package com.lifetrackhub.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
@ToString
public class BlogCommentAddRequestDto {
    @NotNull
    private String slug;

    @NotNull
    @Length(min = 1, max = 10000)
    private String content;
}
