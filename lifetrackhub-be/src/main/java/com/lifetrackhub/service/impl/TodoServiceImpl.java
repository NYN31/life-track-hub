package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.TodoStatus;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.dto.blob.TodoItems;
import com.lifetrackhub.entity.Todo;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.TodoRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    public TodoServiceImpl(UserRepository userRepository, TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Todo> findAllTodosByEmail(String email, Integer page, Integer size) {
        validateUserWithUserId(email);
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("lastModifiedDate").descending());
        return todoRepository.findAllByEmail(email, pageRequest);
    }

    @Override
    public Todo findTodoByEmail(String email) {
        User user = Util.getUserFromSecurityContextHolder(userRepository).get();
        log.info("Find todo by email: {}", email);

        if (!user.getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not belong to this email");
        }

        return todoRepository.findByEmail(user.getEmail())
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Todo does not exist by id: " + user.getEmail()
                        )
                );
    }

    @Override
    public TodoDto addTodo(TodoDto dto) {
        log.info("Adding new todo: {}", dto);
        validateUserWithUserId(dto.getEmail());

        Todo todo = new Todo();
        todo.setEmail(dto.getEmail());
        todo.setTitle(dto.getTitle());
        todo.setStatus(TodoStatus.IN_PROGRESS);
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
        validateUserWithUserId(dto.getEmail());

        Optional<Todo> optional = todoRepository.findById(dto.getId());
        if (optional.isEmpty()) {
            log.warn("Todo with id {} not found", dto.getId());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo with id " + dto.getId() + " not found");
        }

        Todo todo = optional.get();
        todo.setTitle(dto.getTitle());
        todo.setStatus(dto.getTodoStatus());
        TodoItems todoItems = new TodoItems();
        todoItems.setTodoItems(dto.getTodoItems());
        todo.setTodoItems(todoItems);

        todo = todoRepository.save(todo);
        log.info("Todo updated: {}", todo);

        return TodoDto.formEntity(todo);

    }

    private void validateUserWithUserId(String email) {
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder(userRepository).get();

        if (email == null) {
            log.warn("User email is null");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User email is null");
        }

        if (userFromSecurityContext == null || !Objects.equals(email, userFromSecurityContext.getEmail())) {
            log.warn("Unauthorized user email passed in");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user email passed in");
        }
    }
}
