package com.lifetrackhub.converter;

import com.lifetrackhub.constant.utils.SerializationUtil;
import org.springframework.core.convert.converter.Converter;

public abstract class AbstractReadingConverter<T> implements Converter<byte[], T> {

    @Override
    public T convert(byte[] source) {
        return SerializationUtil.deserialize(source, valueType());
    }

    protected abstract Class<T> valueType();
}
