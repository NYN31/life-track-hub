package com.lifetrackhub.repository;

import com.lifetrackhub.constant.enumeration.LikeType;
import com.lifetrackhub.entity.BlogLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogLikeRepository extends JpaRepository<BlogLike, Long> {
    Optional<BlogLike> findByBlogIdAndUserId(Long blogId, Long userId);

    Long countByBlogIdAndLikeType(Long blogId, LikeType likeType);
}
