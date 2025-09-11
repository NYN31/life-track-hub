package com.lifetrackhub.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class BlogLikeCommentCountResponseDto extends CommonResponseDto {
    private Long likeCount;

    private Long commentCount;
}
