package com.lifetrackhub.constant.utils;

import com.lifetrackhub.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class Util {
    public static User getUserFromSecurityContextHolder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public static String getUUId() {
        return UUID.randomUUID().toString();
    }
}
