package com.lifetrackhub.repository;

import com.lifetrackhub.constant.enumeration.FileType;
import com.lifetrackhub.entity.File;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findByFilePath(String filePath);

    Page<File> findAllByUserIdAndFileTypeAndCreatedDateBetween(Long userId, FileType fileType, Instant start, Instant end, Pageable pageable);

    void deleteByFilePath(String filePath);

    long countByUserIdAndCreatedDateBetween(@NotNull Long userId, Instant start, Instant end);
}
