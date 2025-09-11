package com.lifetrackhub.repository;

import com.lifetrackhub.entity.BlogComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogCommentRepository extends JpaRepository<BlogComment, Long> {

    Page<BlogComment> findByBlogIdAndIsDeletedFalseOrderByCreatedDateDesc(
            Long blogId, Pageable pageable
    );

    long countByBlogIdAndIsDeletedFalse(Long blogId);
}
