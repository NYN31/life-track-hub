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

    @GetMapping("/todo/by-user-id/{userId}/{page}/{size}")
    public PageDto<TodoDto> findAllByUserId(@PathVariable Long userId,
                                            @PathVariable Integer page,
                                            @PathVariable Integer size) {
        Page<Todo> todos = todoService.findAllByUserId(userId, page, size);
        return PageDto.fromEntity(todos, TodoDto::formEntity);
    }

    @GetMapping("/todo/by-id/{id}")
    public TodoDto findTodoById(@PathVariable Long id) {
        Todo todo = todoService.findTodoById(id);
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
