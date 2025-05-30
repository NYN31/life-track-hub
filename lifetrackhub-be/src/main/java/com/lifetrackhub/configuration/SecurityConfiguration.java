package com.lifetrackhub.configuration;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.exception.FilterChainExceptionAuthenticationEntryPoint;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {
    private final JwtService jwtService;
    private final FilterChainExceptionAuthenticationEntryPoint authEntryPoint;

    public SecurityConfiguration(JwtService jwtService,
                                 UserRepository userRepository,
                                 FilterChainExceptionAuthenticationEntryPoint authEntryPoint) {
        this.jwtService = jwtService;
        this.authEntryPoint = authEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/auth/**", "/public/**").permitAll()
                        .requestMatchers("/super-admin/api/**")
                            .hasAnyAuthority(Role.SUPER_ADMIN.name())
                        .requestMatchers("/admin/api/**")
                            .hasAnyAuthority(Role.SUPER_ADMIN.name(), Role.ADMIN.name())
                        .requestMatchers("/api/**")
                            .hasAnyAuthority(Role.SUPER_ADMIN.name(), Role.USER.name(), Role.ADMIN.name())
                        .anyRequest()
                        .authenticated()
                )
                .addFilterBefore(
                        new JwtAuthenticationFilter(jwtService),
                        UsernamePasswordAuthenticationFilter.class
                )
                .exceptionHandling(customizer -> customizer.authenticationEntryPoint(authEntryPoint))
                .build();
    }
}
