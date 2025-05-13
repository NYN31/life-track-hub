package com.lifetrackhub.repository;

import com.lifetrackhub.entity.Image;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByFilePath(String filePath);

    Page<Image> findAllByUserIdAndCreatedDateBetween(@NotNull Long userId, Instant createdDate, Instant createdDate2, Pageable pageable);
}
