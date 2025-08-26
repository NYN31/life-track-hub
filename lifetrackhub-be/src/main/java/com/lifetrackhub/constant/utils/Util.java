package com.lifetrackhub.constant.utils;

import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


public class Util {
    public static Optional<User> getUserFromSecurityContextHolder(UserRepository userRepository) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty(); // Unauthenticated user
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User) {
            String email = ((User) principal).getEmail();
            return userRepository.findByEmail(email);
        }

        if (principal instanceof String email) {
            return userRepository.findByEmail(email);
        }

        return Optional.empty();
    }

    public static User getUserFromSecurityContext(UserRepository userRepository) {
        Optional<User> optionalUser = Util.getUserFromSecurityContextHolder(userRepository);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        return optionalUser.get();
    }
}
