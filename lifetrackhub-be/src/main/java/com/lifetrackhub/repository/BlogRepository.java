package com.lifetrackhub.repository;

import com.lifetrackhub.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findBySlug(String slug);

    Page<Blog> findByTitleContaining(String title, Pageable pageable);

    @Query("""
                SELECT b FROM Blog b
                WHERE (:userId IS NULL OR b.user.id = :userId)
                  AND (:slug is NULL OR b.slug = :slug)
                  AND (:visibility IS NULL OR b.visibility = :visibility)
                  AND (:start IS NULL OR b.createdDate >= :start)
                  AND (:end IS NULL OR b.createdDate <= :end)
            """)
    Page<Blog> findAllBlogs(Long userId, String slug, String visibility, Instant start, Instant end, Pageable pageable);

    Page<Blog> findAllByUserIdAndVisibility(Long userId, String name, Pageable pageable);

    Optional<Blog> getBlogBySlug(String slug);
}
