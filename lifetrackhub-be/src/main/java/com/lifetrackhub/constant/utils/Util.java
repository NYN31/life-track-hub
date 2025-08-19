package com.lifetrackhub.constant.utils;

import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;


public class Util {
    public static Optional<User> getUserFromSecurityContextHolder(UserRepository userRepository) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty(); // No logged in user
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User) {
            String email = ((User) principal).getEmail();
            return userRepository.findByEmail(email);
        }

        if (principal instanceof String) {
            String email = (String) principal;
            return userRepository.findByEmail(email);
        }

        return Optional.empty();
    }
}
