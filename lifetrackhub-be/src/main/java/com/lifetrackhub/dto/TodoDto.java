package com.lifetrackhub.dto;

import com.lifetrackhub.dto.record.todo.TodoItem;
import com.lifetrackhub.entity.Todo;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.Arrays;

public class TodoDto {
    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    @Length(min = 3, max = 255)
    private String title;

    private Boolean done;

    private TodoItem[] todoItems;

    public static TodoDto formEntity(Todo entity) {
        TodoDto dto = new TodoDto();

        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setTitle(entity.getTitle());
        dto.setDone(entity.isDone());
        dto.setTodoItems(entity.getTodoItems().getTodoItems());

        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long todoId) {
        this.userId = todoId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public TodoItem[] getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(TodoItem[] todoItems) {
        this.todoItems = todoItems;
    }

    @Override
    public String toString() {
        return "TodoDto{" +
                "id=" + id +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", done=" + done +
                ", todoItems=" + Arrays.toString(todoItems) +
                '}';
    }
}
