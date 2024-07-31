package com.lifetrackhub.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Collections;

@Service
public class JwtServiceImpl implements JwtService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final Algorithm algorithm;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.expiration.time}")
    private long expirationTime;

    public JwtServiceImpl(@Value("${jwt.secret.key}") String secretKey) {
        this.algorithm = Algorithm.HMAC256(secretKey);
    }

    @Override
    public String createToken(User user) {
        log.info("Jwt token create request info: {}", user);
        try {
            String role = user.getRole();
            log.info("Jwt token role/authorities: {}", role);
            String token = JWT.create()
                    .withSubject(user.getEmail())
                    .withIssuer(issuer)
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(Instant.now().plusSeconds(expirationTime))
                    .withClaim("enabled", user.isEnabled())
                    .withClaim("role", Collections.singletonList(role))
                    .withClaim("userId", user.getId())
                    .sign(algorithm);

            log.info("Token created successfully: {}", token);
            return token;
        } catch (JWTCreationException exception) {
            log.warn("Jwt token creation failed: {}", exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }

    @Override
    public DecodedJWT verify(String accessToken) {
        log.info("Access token: {}", accessToken);
        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .withClaim("enabled", true)
                    .withClaimPresence("userId")
                    .withClaimPresence("role")
                    .build();

            return verifier.verify(accessToken);
        } catch (JWTVerificationException exception) {
            log.info("Jwt verification failed: {}", exception.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, exception.getMessage());
        }
    }
}
