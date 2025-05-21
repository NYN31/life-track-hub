package com.lifetrackhub.constant.utils;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;

public class DateUtil {
    public static Instant getStartDate(LocalDate date) {
        date = Optional.ofNullable(date)
                .orElse(LocalDate.now().with(TemporalAdjusters.firstDayOfMonth()));
        return date.atTime(LocalTime.MIN).atZone(ZoneId.of("Asia/Dhaka")).toInstant();
    }

    public static Instant getEndDate(LocalDate date) {
        date = Optional.ofNullable(date)
                .orElse(LocalDate.now());
        return date.atTime(LocalTime.MAX).atZone(ZoneId.of("Asia/Dhaka")).toInstant();
    }

    public static Instant getStartOfCurrentDay() {
        LocalDate date = LocalDate.now(ZoneOffset.UTC);
        return date.atTime(LocalTime.MIN).atZone(ZoneId.of("Asia/Dhaka")).toInstant();
    }

    public static Instant getEndOfCurrentDay() {
        LocalDate date = LocalDate.now(ZoneOffset.UTC);
        return date.atTime(LocalTime.MAX).atZone(ZoneId.of("Asia/Dhaka")).toInstant();
    }
}
