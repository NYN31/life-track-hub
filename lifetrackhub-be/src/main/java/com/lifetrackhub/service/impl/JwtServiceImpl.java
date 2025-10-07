package com.lifetrackhub.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.service.JwtService;
import com.lifetrackhub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtServiceImpl implements JwtService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    private final UserService userService;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.expiration.time}")
    private long expirationTime;

    public JwtServiceImpl(@Value("${jwt.secret.key}") String secretKey, UserService userService) {
        this.algorithm = Algorithm.HMAC256(secretKey);
        this.verifier = JWT.require(algorithm)
                .withClaim("accountStatus", AccountStatus.ACTIVE.toString())
                .withClaimPresence("role")
                .build();
        this.userService = userService;
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
                    .withClaim("accountStatus", user.getAccountStatus().toString())
                    .withClaim("accountType", user.getAccountType().toString())
                    .withClaim("role", Collections.singletonList(role))
                    .sign(algorithm);

            log.info("Token created successfully: {}", token);
            return token;
        } catch (JWTCreationException exception) {
            log.warn("Jwt token creation failed: {}", exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }

    @Override
    public UsernamePasswordAuthenticationToken verify(String accessToken) {
        DecodedJWT jwt = verifier.verify(accessToken);

        String email = jwt.getSubject();
        Claim role = jwt.getClaim("role");
        log.info("email: {} & role/authorities: {}", email, role);
        User user = userService.findUserByEmail(email);
        user.setUserDetails(null);

        if(user.getAccountStatus().equals(AccountStatus.INACTIVE) ||
                user.getAccountStatus().equals(AccountStatus.DELETED)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        List<SimpleGrantedAuthority> authorities = role
                .asList(String.class)
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(user, null, authorities);
    }
}
