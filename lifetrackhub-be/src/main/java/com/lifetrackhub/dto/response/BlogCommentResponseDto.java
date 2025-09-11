package com.lifetrackhub.dto.response;

import com.lifetrackhub.entity.BlogComment;
import com.lifetrackhub.entity.User;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@ToString
public class BlogCommentResponseDto {
    private Long commentId;

    private String username;

    private String userProfilePictureUrl;

    private String content;

    private Instant createdDate;

    public static BlogCommentResponseDto formEntity(
            BlogComment blogComment) {
        BlogCommentResponseDto dto = new BlogCommentResponseDto();
        User user = blogComment.getUser();

        dto.setCommentId(blogComment.getId());
        dto.setUsername(user.getFirstname() + " " + user.getLastname());
        dto.setUserProfilePictureUrl("");
        dto.setContent(blogComment.getContent());
        dto.setCreatedDate(blogComment.getCreatedDate());

        return dto;
    }
}
