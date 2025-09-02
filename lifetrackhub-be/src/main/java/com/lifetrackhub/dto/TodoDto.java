package com.lifetrackhub.dto;

import com.lifetrackhub.constant.enumeration.TodoStatus;
import com.lifetrackhub.dto.record.todo.TodoItem;
import com.lifetrackhub.entity.Todo;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import java.time.Instant;

@Data
@ToString
public class TodoDto {
    private Long id;

    @NotNull
    private String email;

    @NotNull
    @Length(min = 3, max = 255)
    private String title;

    @NotNull
    private TodoStatus todoStatus;

    private TodoItem[] todoItems;

    private Instant createdDate;

    private Instant lastModifiedDate;

    public static TodoDto formEntity(Todo todo) {
        TodoDto dto = new TodoDto();

        dto.setId(todo.getId());
        dto.setEmail(todo.getEmail());
        dto.setTitle(todo.getTitle());
        dto.setTodoStatus(todo.getStatus());
        dto.setTodoItems(todo.getTodoItems().getTodoItems());
        dto.setCreatedDate(todo.getCreatedDate());
        dto.setLastModifiedDate(todo.getLastModifiedDate());

        return dto;
    }
}
