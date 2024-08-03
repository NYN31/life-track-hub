package com.lifetrackhub.dto;

import com.lifetrackhub.dto.records.todo.TodoItem;

import java.util.Arrays;

public class TodoItems {
    private TodoItem[] todoItems;

    public TodoItem[] getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(TodoItem[] todoItems) {
        this.todoItems = todoItems;
    }

    @Override
    public String toString() {
        return "TodoItems{" +
                "todoItems=" + Arrays.toString(todoItems) +
                '}';
    }
}
