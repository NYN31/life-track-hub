package com.lifetrackhub.controller.userController;

import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.entity.Todo;
import com.lifetrackhub.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodoController extends BaseController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todo/all/by-email/{email}/{page}/{size}")
    public PageDto<TodoDto> findAllTodosByEmail(@PathVariable String email,
                                                 @PathVariable Integer page,
                                                 @PathVariable Integer size) {
        Page<Todo> todos = todoService.findAllTodosByEmail(email, page, size);
        return PageDto.fromEntity(todos, TodoDto::formEntity);
    }

    @GetMapping("/todo/by-email/{email}")
    public TodoDto findTodoByEmail(@PathVariable String email) {
        Todo todo = todoService.findTodoByEmail(email);
        return TodoDto.formEntity(todo);
    }

    @PostMapping("/todo/add")
    public TodoDto addTodo(@RequestBody @Valid TodoDto dto) {
        return todoService.addTodo(dto);
    }

    @PutMapping("/todo/update")
    public TodoDto updateTodo(@RequestBody @Valid TodoDto dto) {
        return todoService.updateTodo(dto);
    }
}
