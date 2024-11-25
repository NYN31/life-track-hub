package com.lifetrackhub.converter;

import com.lifetrackhub.constant.utils.SerializationUtil;
import com.lifetrackhub.dto.blob.UserDetails;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class UserDetailsConverter implements AttributeConverter<UserDetails, byte[]> {
    @Override
    public byte[] convertToDatabaseColumn(UserDetails userDetails) {
        return SerializationUtil.serialize(userDetails);
    }

    @Override
    public UserDetails convertToEntityAttribute(byte[] dbData) {
        return SerializationUtil.deserialize(dbData, UserDetails.class);
    }
}
