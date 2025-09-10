package com.lifetrackhub.entity.id;

import java.io.Serializable;
import java.util.Objects;

public class BlogLikeId implements Serializable {
    private Long blogId;
    private Long userId;

    public BlogLikeId() {}

    public BlogLikeId(Long blogId, Long userId) {
        this.blogId = blogId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BlogLikeId)) return false;
        BlogLikeId that = (BlogLikeId) o;
        return Objects.equals(blogId, that.blogId) &&
                Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(blogId, userId);
    }
}