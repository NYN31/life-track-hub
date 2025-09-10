package com.lifetrackhub.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class BlogLikeCountResponseDto extends CommonResponseDto {
    private Long likeCount;
}
