package com.lifetrackhub.repository;

import com.lifetrackhub.constant.enumeration.TodoStatus;
import com.lifetrackhub.entity.Todo;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    Page<Todo> findAllByEmail(String email, Pageable pageable);

    Optional<Todo> findByEmail(String email);

    @Query("""
            SELECT t from Todo t
                WHERE (:email IS NULL OR t.email = :email)
                  AND (:title IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%')))
                  AND (:status IS NULL OR t.status = :status)
                  AND (:start IS NULL OR t.createdDate >= :start)
                  AND (:end IS NULL OR t.createdDate <= :end)
            """)
    Page<Todo> findAllWithFilter(String email, String title, TodoStatus status, Instant start, Instant end, Pageable pageable);

    long countByEmailAndCreatedDateBetween(@NotNull String email, Instant start, Instant end);
}