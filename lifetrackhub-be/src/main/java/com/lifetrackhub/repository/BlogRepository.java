package com.lifetrackhub.repository;

import com.lifetrackhub.constant.enumeration.BlogStatus;
import com.lifetrackhub.dto.response.CountByStatusDto;
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
    Optional<Blog> findBySlug(String slug);

    Page<Blog> findByTitleContaining(String title, Pageable pageable);

    @Query("""
                SELECT b FROM Blog b
                WHERE (:userId IS NULL OR b.user.id = :userId)
                  AND (:slug is NULL OR b.slug = :slug)
                  AND (:status IS NULL OR b.status = :status)
                  AND (:start IS NULL OR b.createdDate >= :start)
                  AND (:end IS NULL OR b.createdDate <= :end)
            """)
    Page<Blog> findAllBlogs(Long userId, String slug, BlogStatus status, Instant start, Instant end, Pageable pageable);

    Page<Blog> findAllByUserIdAndStatus(Long userId, BlogStatus status, Pageable pageable);

    Optional<Blog> getBlogBySlug(String slug);

    @Query("SELECT new com.lifetrackhub.dto.response.CountByStatusDto(b.status, COUNT(b)) FROM Blog b " +
            "WHERE (:userId IS NULL OR b.user.id = :userId)" +
            "GROUP BY b.status")
    List<CountByStatusDto> countGroupByStatus(Long userId);
}
