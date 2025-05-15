package com.lifetrackhub.dto.record.user;

import java.time.LocalDate;

public record Experience(String organizationName, String designation, String description, LocalDate startDate,
                         LocalDate endDate, String link) {
}
