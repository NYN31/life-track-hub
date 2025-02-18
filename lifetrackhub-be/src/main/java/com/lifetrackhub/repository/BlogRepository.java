package com.lifetrackhub.repository;

import com.lifetrackhub.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findByTitle(String title);

    Optional<Blog> findBySlug(String slug);

    Page<Blog> findByTitleContaining(String title, Pageable pageable);

    Page<Blog> findAllByCreatedDateBetween(Instant start, Instant end, Pageable pageable);

    Page<Blog> findAllByVisibilityAndCreatedDateBetween(String visibility, Instant start, Instant end, Pageable pageable);

    Page<Blog> findAllByUserIdAndCreatedDateBetween(Long userId, Instant start, Instant end, Pageable pageable);

    Page<Blog> findAllByUserIdAndVisibilityAndCreatedDateBetween(Long userId, String visibility, Instant start, Instant end, Pageable pageable);
}
