package com.lifetrackhub.dto.record.user;

public record Education(String institutionName, String courseName, boolean isPresent, int startYear, int endYear,
                        double result) {
}
