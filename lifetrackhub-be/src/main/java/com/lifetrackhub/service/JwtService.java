package com.lifetrackhub.service;

import com.lifetrackhub.entity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public interface JwtService {
    String createToken(User user);

    UsernamePasswordAuthenticationToken verify(String token);
}
