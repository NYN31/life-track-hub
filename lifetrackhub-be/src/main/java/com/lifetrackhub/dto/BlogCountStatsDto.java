package com.lifetrackhub.dto;

import com.lifetrackhub.dto.response.CountByStatusDto;
import lombok.*;

import java.util.List;

@Data
@ToString
public class BlogCountStatsDto {
    private List<CountByStatusDto> statusCounts;

    public BlogCountStatsDto(List<CountByStatusDto> statusCounts) {
        this.statusCounts = statusCounts;
    }
}
