package com.lifetrackhub.dto.records;

import java.time.Instant;

public record Education(String title, String institution, Instant graduationStartDate, Instant graduationEndDate,
                        String result) {
}
