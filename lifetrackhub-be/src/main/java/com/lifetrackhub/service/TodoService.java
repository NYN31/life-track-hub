package com.lifetrackhub.service;

import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.entity.Todo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TodoService {
    List<Todo> findAllByUserId(Long userId);

    Todo findTodoById(Long id);

    TodoDto addTodo(TodoDto dto);

    TodoDto updateTodo(TodoDto dto);
}
