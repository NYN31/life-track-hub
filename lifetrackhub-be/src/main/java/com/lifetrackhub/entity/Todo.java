package com.lifetrackhub.entity;

import com.lifetrackhub.dto.TodoItems;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class Todo extends BaseEntity{
    private String title;

    private boolean done;

    private TodoItems todoItems;

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
                "title='" + title + '\'' +
                ", done=" + done +
                ", todoItems=" + todoItems +
                '}';
    }
}
