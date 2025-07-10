package com.lifetrackhub.dto;

import com.lifetrackhub.constant.enumeration.BlogContentType;
import com.lifetrackhub.constant.enumeration.BlogStatus;
import com.lifetrackhub.entity.Blog;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@ToString
public class BlogDto {
    private String title;

    private String content;

    private String slug;

    private BlogStatus status;

    private String coverImagePath;

    private String tags;

    private BlogContentType contentType;

    private UserDto user;

    private Instant createdDate;

    private Instant lastModifiedDate;

    public static BlogDto formEntity(Blog blog) {
        BlogDto dto = new BlogDto();

        dto.setTitle(blog.getTitle());
        dto.setContent(blog.getContent());
        dto.setSlug(blog.getSlug());
        dto.setStatus(blog.getStatus());
        dto.setCoverImagePath(blog.getCoverImagePath());
        dto.setTags(blog.getTags());
        dto.setUser(UserDto.formEntityWithoutDetails(blog.getUser()));
        dto.setCreatedDate(blog.getCreatedDate());
        dto.setLastModifiedDate(blog.getLastModifiedDate());

        return dto;
    }
}
