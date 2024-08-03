package com.lifetrackhub.converter;

import com.lifetrackhub.dto.records.todo.TodoItem;

public class TodoItemReadingConverter extends AbstractReadingConverter<TodoItem> {
    @Override
    protected Class<TodoItem> valueType() {
        return TodoItem.class;
    }
}
