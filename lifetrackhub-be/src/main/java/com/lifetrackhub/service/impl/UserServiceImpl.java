package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.UserDto;
import com.lifetrackhub.dto.blob.UserDetails;
import com.lifetrackhub.dto.request.UpdatePasswordRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void throwIfUserExistByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            log.warn("User already exist by {}", email);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exist with this email.");
        }
    }

    @Override
    public User findSelfDetails() {
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder(userRepository).get();

        return findUserById(userFromSecurityContext.getId());
    }

    @Override
    public User findUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with this id.");
        }

        User updateduser = user.get();
        if (updateduser.getUserDetails() == null) {
            updateduser.setUserDetails(new UserDetails());
        }
        return updateduser;
    }

    @Override
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with this email.");
        }
        return user.get();
    }

    @Override
    public User update(UserDto dto) {
        String email = dto.getEmail();
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder(userRepository).get();

        if (!Objects.equals(email, userFromSecurityContext.getEmail())) {
            log.warn("User email {} is unauthorized", email);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email " + email + " is unauthorized.");
        }

        User user;
        Optional<User> optional = userRepository.findByEmail(dto.getEmail());
        if (optional.isEmpty()) {
            log.warn("User does not exist with email {}", email);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with this email.");
        } else {
            user = optional.get();
            user.setFirstname(dto.getFirstname());
            user.setLastname(dto.getLastname());
            user.setRole(dto.getRole());
            user.setUserDetails(dto.getUserDetails());

            return userRepository.save(user);
        }
    }

    @Override
    public CommonResponseDto updatePassword(UpdatePasswordRequestDto dto) {
        User user = Util.getUserFromSecurityContextHolder(userRepository).get();

        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Old password does not match.");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        return CommonResponseDto
                .builder()
                .message("Password updated successfully.")
                .status(HttpStatus.OK)
                .build();
    }

    @Override
    public Page<User> getUsers(int page, int size, String email, Role role, AccountStatus accountStatus, AccountType accountType, LocalDate startDate, LocalDate endDate) {
        log.info("Get users by filtered attributes - email: {}, role: {}, accountStatus: {}, accountType: {}, start: {}, end: {}", email, role, accountStatus, accountType, startDate, endDate);
        String roleName = null;
        if (role != null) {
            roleName = role.name();
        }

        Sort sort = Sort.by(Sort.Direction.ASC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);

        return userRepository.findByEmailAndRoleNameAndAccountStatusAndAccountTypeAndCreatedDateBetween(email, roleName, accountStatus, accountType, start, end, pageable);
    }

    @Override
    public CommonResponseDto updateRole(String email, Role role) {
        if (Objects.equals(role, Role.SUPER_ADMIN)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only one super-admin role is allowed.");
        }

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with the email: " + email);
        }
        User user = optional.get();
        user.setRole(role.name());
        userRepository.save(user);

        return CommonResponseDto
                .builder()
                .status(HttpStatus.OK)
                .message("Role has been updated.")
                .build();
    }

    @Override
    public CommonResponseDto updateStatus(String email, AccountStatus accountStatus) {
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with the email: " + email);
        }
        User user = optional.get();
        user.setAccountStatus(accountStatus);
        userRepository.save(user);

        return CommonResponseDto
                .builder()
                .status(HttpStatus.OK)
                .message("Account status has been updated.")
                .build();
    }

    @Override
    public CommonResponseDto upgradeAccount(String email, AccountType accountType) {
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist with the email: " + email);
        }
        User user = optional.get();
        user.setAccountType(accountType);
        userRepository.save(user);

        return CommonResponseDto
                .builder()
                .status(HttpStatus.OK)
                .message("Account type upgraded successfully.")
                .build();
    }
}
