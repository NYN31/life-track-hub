package com.lifetrackhub.repository;

import com.lifetrackhub.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
    Page<Todo> findAllByUserId(Long userId, Pageable pageable);
}