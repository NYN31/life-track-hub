package com.lifetrackhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.time.Instant;

@Data
@AllArgsConstructor
public class DateRangePageRequest {
    private Pageable pageable;
    private Instant start;
    private Instant end;
}
