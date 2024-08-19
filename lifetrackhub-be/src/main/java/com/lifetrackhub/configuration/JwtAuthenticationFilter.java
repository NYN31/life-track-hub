package com.lifetrackhub.configuration;
import com.lifetrackhub.service.JwtService;
import jakarta.annotation.Nullable;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final static String AUTHORIZATION_HEADER = "Authorization";
    private final static String AUTHORIZATION_SCHEME = "Bearer";

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
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
            UsernamePasswordAuthenticationToken authentication = jwtService.verify(accessToken);
            context.setAuthentication(authentication);
        } catch (Exception e) {
            log.info("Token verification failed: {}", e.getMessage());
            context.setAuthentication(null);
        }

        assert filterChain != null;
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        log.info("Extracting access token from request");
        String authorization = request.getHeader(AUTHORIZATION_HEADER);
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_SCHEME)) {
            return null;
        }

        return authorization.substring(7);
    }
}
