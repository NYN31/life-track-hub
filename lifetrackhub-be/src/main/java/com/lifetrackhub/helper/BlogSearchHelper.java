package com.lifetrackhub.helper;

import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.dto.response.DateRangePageRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

public class BlogSearchHelper {
    public static DateRangePageRequest buildDateRangePageRequest(
            int page, int size, LocalDate from, LocalDate to,
            int maxAllowedDays
    ) {
        Pageable pageable = PageRequest.of(page, size);

        if (Objects.isNull(from) || Objects.isNull(to)) {
            from = LocalDate.now().minusDays(maxAllowedDays);
            to = LocalDate.now();
        }

        Instant start = DateUtil.getStartDate(from);
        Instant end = DateUtil.getEndDate(to);

        long days = ChronoUnit.DAYS.between(start, end);

        // Validation
        if (days > maxAllowedDays) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Date range should be in between " + maxAllowedDays + " days"
            );
        }

        return new DateRangePageRequest(pageable, start, end);
    }
}
