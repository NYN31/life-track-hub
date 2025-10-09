package com.lifetrackhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class LifetrackhubApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifetrackhubApplication.class, args);
    }

}
