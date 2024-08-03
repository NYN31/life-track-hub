package com.lifetrackhub.dto;

import com.lifetrackhub.dto.records.todo.TodoItem;
import com.lifetrackhub.entity.Todo;

import java.util.Arrays;

public class TodoDto extends BaseDto {
    private Long userId;

    private String title;

    private Boolean done;

    private TodoItem[] todoItems;

    public static TodoDto formEntity(Todo entity) {
        TodoDto dto = new TodoDto();

        dto.fill(entity);
        dto.setUserId(entity.getUserId());
        dto.setTitle(entity.getTitle());
        dto.setDone(entity.isDone());
        dto.setTodoItems(entity.getTodoItems().getTodoItems());

        return dto;
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
                "userId=" + userId +
                ", title='" + title + '\'' +
                ", done=" + done +
                ", todoItems=" + Arrays.toString(todoItems) +
                '}';
    }
}
