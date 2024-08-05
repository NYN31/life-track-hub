package com.lifetrackhub.converter;

import com.lifetrackhub.dto.blob.UserDetails;

public class UserDetailsReadingConverter extends AbstractReadingConverter<UserDetails> {
    @Override
    protected Class<UserDetails> valueType() {
        return UserDetails.class;
    }
}
