package com.lifetrackhub.service;

import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface TodoService {
    Page<Todo> findAllByUserId(Long userId, Integer page, Integer size);

    Todo findTodoById(Long id);

    TodoDto addTodo(TodoDto dto);

    TodoDto updateTodo(TodoDto dto);
}
