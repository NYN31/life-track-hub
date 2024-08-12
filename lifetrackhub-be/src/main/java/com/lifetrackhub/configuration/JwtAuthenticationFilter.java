package com.lifetrackhub.configuration;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.JwtService;
import jakarta.annotation.Nullable;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final static String AUTHORIZATION_HEADER = "Authorization";
    private final static String AUTHORIZATION_SCHEME = "Bearer";

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            @Nullable HttpServletRequest request,
            @Nullable HttpServletResponse response,
            @Nullable FilterChain filterChain) throws ServletException, IOException {
        assert request != null;
        String accessToken = extractToken(request);

        if (accessToken == null) {
            assert filterChain != null;
            filterChain.doFilter(request, response);
            return;
        }

        SecurityContext context = SecurityContextHolder.getContext();
        try {
            DecodedJWT decodedJWT = jwtService.verify(accessToken);
            Long userId = decodedJWT.getClaim("userId").asLong();
            User user = findUserById(userId);
            setAuthenticationContext(decodedJWT, user);

            assert filterChain != null;
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.info("Token verification failed {}", e.getMessage());
            context.setAuthentication(null);
        }
    }

    private String extractToken(HttpServletRequest request) {
        log.info("Extracting access token from request");
        String authorization = request.getHeader(AUTHORIZATION_HEADER);
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_SCHEME)) {
            return null;
        }

        return authorization.substring(7);
    }

    private User findUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return user.get();
    }

    private void setAuthenticationContext(DecodedJWT decodedJWT, User user) {
        log.info("Setting up authentication Context for {}", decodedJWT.getSubject());
        List<String> authorities = decodedJWT.getClaim("role").asList(String.class);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user,
                decodedJWT.getSubject(),
                authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
        );

        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
    }
}
