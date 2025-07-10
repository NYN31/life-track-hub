package com.lifetrackhub.dto.response;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class CountByVisibilityDto implements Serializable {
    private String visibility;
    private Long count;

    public CountByVisibilityDto(String visibility, Long count) {
        this.visibility = visibility;
        this.count = count;
    }
}
