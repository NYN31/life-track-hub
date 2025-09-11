package com.lifetrackhub.dto.response;

import com.lifetrackhub.dto.blob.UserDetails;
import com.lifetrackhub.entity.BlogComment;
import com.lifetrackhub.entity.User;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        Map<String, String> userInfo = getUserInfo(blogComment.getUser());

        dto.setCommentId(blogComment.getId());
        dto.setUsername(userInfo.get("username"));
        dto.setUserProfilePictureUrl(userInfo.get("userProfilePictureUrl"));
        dto.setContent(blogComment.getContent());
        dto.setCreatedDate(blogComment.getCreatedDate());

        return dto;
    }

    public static Map<String, String> getUserInfo(User user) {
        Map<String, String> userInfo = new HashMap<>();
        String profileImageUrl = Optional.ofNullable(user.getUserDetails())
                .map(UserDetails::getProfileImagePath)
                .orElse(null);

        userInfo.put("username", user.getFirstname() + " " + user.getLastname());
        userInfo.put("userProfilePictureUrl", profileImageUrl);
        return userInfo;
    }
}
