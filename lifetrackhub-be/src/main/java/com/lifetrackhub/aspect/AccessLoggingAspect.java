package com.lifetrackhub.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class AccessLoggingAspect {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)" +
            "|| @annotation(org.springframework.web.bind.annotation.PostMapping)" +
            "|| @annotation(org.springframework.web.bind.annotation.PutMapping)" +
            "|| @annotation(org.springframework.web.bind.annotation.DeleteMapping)")
    void requestMapping() {
    }

    @Before("requestMapping()")
    void before(JoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        String args = Arrays.toString(joinPoint.getArgs());
        log.info("REST request on {}.{}() with {}", signature.getDeclaringTypeName(), signature.getName(), args);
    }

    @AfterReturning(value = "requestMapping()")
    void afterReturning(JoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        log.info("REST request on {}.{}() returned successfully", signature.getDeclaringTypeName(), signature.getName());
    }

    @AfterThrowing(value = "requestMapping()")
    void afterThrowing(JoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        log.info("REST request on {}.{}() returned with error", signature.getDeclaringTypeName(), signature.getName());
    }
}
