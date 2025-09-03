package com.lifetrackhub.controller.adminController;

import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.dto.request.TodoSearchRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Todo;
import com.lifetrackhub.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodoController extends AdminBaseController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todo/all")
    public PageDto<TodoDto> findTodosWithFilterCriteria(@Valid @RequestBody TodoSearchRequestDto request) {
        Page<Todo> todos = todoService.findFilteredTodos(request);
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

    @PutMapping("/todo/archived/{id}")
    public CommonResponseDto archivedTodo(@PathVariable Long id) {
        return todoService.archivedTodo(id);
    }
}
