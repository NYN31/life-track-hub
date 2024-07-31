package com.lifetrackhub.constant.utils;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

public class SerializationUtil {

    private final static byte[] EMPTY_ARRAY = new byte[0];

    private static final ObjectMapper OBJECT_MAPPER = Jackson2ObjectMapperBuilder
            .json()
            .serializationInclusion(Include.NON_NULL)
            .build();

    public static byte[] serialize(Object source) {
        if (source == null) {
            return EMPTY_ARRAY;
        }

        try {
            return OBJECT_MAPPER.writeValueAsBytes(source);
        } catch (Exception e) {
            throw new RuntimeException("Could not write JSON: " + e.getMessage(), e);
        }
    }

    public static <T> T deserialize(byte[] source, Class<T> valueType) {
        if (source == null || source.length == 0) {
            return null;
        }

        try {
            return OBJECT_MAPPER.readValue(source, valueType);
        } catch (Exception e) {
            throw new RuntimeException("Could not read JSON: " + e.getMessage(), e);
        }
    }
}
