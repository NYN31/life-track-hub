package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.dto.blob.TodoItems;
import com.lifetrackhub.entity.Todo;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.TodoRepository;
import com.lifetrackhub.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public Page<Todo> findAllByUserId(Long userId, Pageable pageable) {
        validateUserWithUserId(userId);
        return todoRepository.findAllByUserId(userId, pageable);
    }

    @Override
    public Todo findTodoById(Long id) {
        return todoRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Todo does not exist by id: " + id)
                );
    }

    @Override
    public TodoDto addTodo(TodoDto dto) {
        log.info("Adding new todo: {}", dto);
        validateUserWithUserId(dto.getUserId());

        Todo todo = new Todo();
        todo.setUserId(dto.getUserId());
        todo.setTitle(dto.getTitle());
        todo.setDone(dto.getDone());

        TodoItems todoItems = new TodoItems();
        todoItems.setTodoItems(dto.getTodoItems());
        todo.setTodoItems(todoItems);

        todo = todoRepository.save(todo);
        log.info("Todo added: {}", todo);

        return TodoDto.formEntity(todo);
    }

    @Override
    public TodoDto updateTodo(TodoDto dto) {
        log.info("Updating todo: {}", dto);
        validateUserWithUserId(dto.getUserId());

        Optional<Todo> optional = todoRepository.findById(dto.getId());
        if(optional.isEmpty()) {
            log.warn("Todo with id {} not found", dto.getId());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo with id " + dto.getId() + " not found");
        }

        Todo todo = optional.get();
        todo.setTitle(dto.getTitle());
        todo.setDone(dto.getDone());

        TodoItems todoItems = new TodoItems();
        todoItems.setTodoItems(dto.getTodoItems());
        todo.setTodoItems(todoItems);

        todo = todoRepository.save(todo);
        log.info("Todo updated: {}", todo);

        return TodoDto.formEntity(todo);

    }

    private void validateUserWithUserId(Long userId) {
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        if (userId == null) {
            log.warn("User id is null");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id is null");
        }

        if (userFromSecurityContext == null || !Objects.equals(userId, userFromSecurityContext.getId())) {
            log.warn("Unauthorized user id passed in");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user id passed in");
        }
    }
}
