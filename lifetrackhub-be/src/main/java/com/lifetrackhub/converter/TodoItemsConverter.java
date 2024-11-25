package com.lifetrackhub.converter;

import com.lifetrackhub.constant.utils.SerializationUtil;
import com.lifetrackhub.dto.blob.TodoItems;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TodoItemsConverter implements AttributeConverter<TodoItems, byte[]> {
    @Override
    public byte[] convertToDatabaseColumn(TodoItems todoItems) {
        return SerializationUtil.serialize(todoItems);
    }

    @Override
    public TodoItems convertToEntityAttribute(byte[] dbData) {
        return SerializationUtil.deserialize(dbData, TodoItems.class);
    }
}
