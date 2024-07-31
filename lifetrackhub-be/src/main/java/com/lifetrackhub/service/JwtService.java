package com.lifetrackhub.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.lifetrackhub.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface JwtService {
    String createToken(User user);

    DecodedJWT verify(String token);
}
