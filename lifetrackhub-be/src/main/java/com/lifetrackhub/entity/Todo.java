package com.lifetrackhub.entity;

import com.lifetrackhub.dto.blob.TodoItems;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class Todo extends BaseEntity{
    @NotNull
    private Long userId;

    @NotNull
    @Length(min = 3, max = 255)
    private String title;

    private boolean done;

    private TodoItems todoItems;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public TodoItems getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(TodoItems todoItems) {
        this.todoItems = todoItems;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "userId='" + userId + '\'' +
                "title='" + title + '\'' +
                ", done=" + done +
                ", todoItems=" + todoItems +
                '}';
    }
}
