package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.blob.UserDetails;
import com.lifetrackhub.dto.record.user.*;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UserRepository userRepository;

    public UserServiceImpl(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void throwIfUserExistByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            log.warn("User already exist by {}", email);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exist with this email");
        }
    }

    @Override
    public User findUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with this id");
        }

        User updateduser = user.get();
        if (updateduser.getUserDetails() == null) {
            updateUserDetailsObject(updateduser);
        }
        return updateduser;
    }

    @Override
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with this email");
        }
        return user.get();
    }

    @Override
    public User update(UserDto dto) {
        String email = dto.getEmail();
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        if (!Objects.equals(email, userFromSecurityContext.getEmail())) {
            log.warn("User email {} is unauthorized", email);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email " + email + " is unauthorized");
        }

        User user;
        Optional<User> optional = userRepository.findByEmail(dto.getEmail());
        if (optional.isEmpty()) {
            log.warn("User does not exist with email {}", email);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with this email");
        } else {
            user = optional.get();
            user.setFirstname(dto.getFirstname());
            user.setLastname(dto.getLastname());
            user.setRole(dto.getRole());
            user.setUserDetails(dto.getUserDetails());

            return userRepository.save(user);
        }
    }

    private void updateUserDetailsObject(User user) {
        UserDetails userDetails = new UserDetails();

        userDetails.setObjective(null);
        userDetails.setProfileImage(null);
        userDetails.setCv(null);
        userDetails.setSkills(null);
        userDetails.setEducations(null);
        userDetails.setAchievements(null);
        userDetails.setExperiences(null);
        userDetails.setSocialLinks(null);

        user.setUserDetails(userDetails);
    }
}
