package com.lifetrackhub.dto.response;

import com.lifetrackhub.constant.enumeration.BlogStatus;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class CountByStatusDto implements Serializable {
    private BlogStatus status;
    private Long count;

    public CountByStatusDto(BlogStatus status, Long count) {
        this.status = status;
        this.count = count;
    }
}
