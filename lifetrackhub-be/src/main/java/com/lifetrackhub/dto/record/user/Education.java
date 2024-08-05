package com.lifetrackhub.dto.record.user;

import java.time.Instant;

public record Education(String title, String institution, Instant graduationStartDate, Instant graduationEndDate,
                        String result) {
}
