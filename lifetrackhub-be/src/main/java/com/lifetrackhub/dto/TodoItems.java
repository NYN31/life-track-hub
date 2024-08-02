package com.lifetrackhub.dto;

import com.lifetrackhub.dto.records.todo.TodoItem;

public class TodoItems {
    private TodoItem[] todoItems;

    public TodoItem[] getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(TodoItem[] todoItems) {
        this.todoItems = todoItems;
    }
}
