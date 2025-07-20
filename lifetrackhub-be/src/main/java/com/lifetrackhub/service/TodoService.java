package com.lifetrackhub.service;

import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface TodoService {
    Page<Todo> findAllTodosByEmail(String email, Integer page, Integer size);

    Todo findTodoByEmail(String email);

    TodoDto addTodo(TodoDto dto);

    TodoDto updateTodo(TodoDto dto);
}
