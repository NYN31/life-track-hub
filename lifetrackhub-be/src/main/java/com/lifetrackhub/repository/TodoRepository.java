package com.lifetrackhub.repository;

import com.lifetrackhub.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    Page<Todo> findAllByEmail(String email, Pageable pageable);

    Optional<Todo> findByEmail(String email);
}