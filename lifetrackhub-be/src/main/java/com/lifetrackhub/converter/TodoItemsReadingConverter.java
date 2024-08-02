package com.lifetrackhub.converter;

import com.lifetrackhub.dto.TodoItems;

public class TodoItemsReadingConverter extends AbstractReadingConverter<TodoItems> {
    @Override
    protected Class<TodoItems> valueType() {
        return TodoItems.class;
    }
}
