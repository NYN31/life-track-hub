package com.lifetrackhub.converter;

import com.lifetrackhub.constant.utils.SerializationUtil;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;

@WritingConverter
public abstract class AbstractWritingConverter<T> implements Converter<T, byte[]> {

    @Override
    public byte[] convert(T source) {
        return SerializationUtil.serialize(source);
    }
}
