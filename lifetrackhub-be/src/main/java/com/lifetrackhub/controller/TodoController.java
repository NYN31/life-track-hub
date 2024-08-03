package com.lifetrackhub.controller;

import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.entity.Todo;
import com.lifetrackhub.service.TodoService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController extends BaseController {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todo/by-user-id/{userId}")
    public List<Todo> findAllByUserId(@PathVariable Long userId) {
        return todoService.findAllByUserId(userId);
    }

    @PostMapping("/todo/add")
    public TodoDto addTodo(@RequestBody @Valid TodoDto dto) {
        log.info("Request in add todo controller");
        return todoService.addTodo(dto);
    }
}
