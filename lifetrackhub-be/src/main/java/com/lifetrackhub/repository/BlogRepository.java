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

    @Query(value = """
            SELECT *
            FROM blog b
            WHERE (:userId IS NULL OR b.user_id = :userId)
              AND (:slug IS NULL OR b.slug = :slug)
              AND (:status IS NULL OR b.status = :status)
              AND (:start IS NULL OR b.created_date >= :start)
              AND (:end IS NULL OR b.created_date <= :end)
              AND (:keyword IS NULL
                   OR MATCH(b.title, b.tags) AGAINST(:keyword IN NATURAL LANGUAGE MODE))
            ORDER BY MATCH(b.title, b.tags) AGAINST(:keyword IN NATURAL LANGUAGE MODE) DESC
            """,
            countQuery = """
                    SELECT COUNT(*)
                    FROM blog b
                    WHERE (:userId IS NULL OR b.user_id = :userId)
                      AND (:slug IS NULL OR b.slug = :slug)
                      AND (:status IS NULL OR b.status = :status)
                      AND (:start IS NULL OR b.created_date >= :start)
                      AND (:end IS NULL OR b.created_date <= :end)
                      AND (:keyword IS NULL
                           OR MATCH(b.title, b.tags) AGAINST(:keyword IN NATURAL LANGUAGE MODE))
                    """,
            nativeQuery = true)
    Page<Blog> findAllBlogs(Long userId, String keyword, String slug, String status, Instant start, Instant end, Pageable pageable);

    @Query("""
                SELECT b FROM Blog b
                WHERE (:userId IS NULL OR b.user.id = :userId)
                AND (:status IS NULL OR b.status = :status)
                           AND (:start IS NULL OR b.createdDate >= :start)
                      AND (:end IS NULL OR b.createdDate <= :end)
            """)
    Page<Blog> findSelfBlogs(Long userId, BlogStatus status, Instant start, Instant end, Pageable pageable);

    Optional<Blog> getBlogBySlug(String slug);

    @Query("SELECT new com.lifetrackhub.dto.response.CountByStatusDto(b.status, COUNT(b)) FROM Blog b " +
            "WHERE (:userId IS NULL OR b.user.id = :userId)" +
            "GROUP BY b.status")
    List<CountByStatusDto> countGroupByStatus(Long userId);
}
