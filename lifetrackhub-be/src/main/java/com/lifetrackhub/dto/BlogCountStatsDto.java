package com.lifetrackhub.dto;

import com.lifetrackhub.dto.response.CountByContentTypeDto;
import com.lifetrackhub.dto.response.CountByVisibilityDto;
import lombok.*;

import java.util.List;

@Data
@ToString
public class BlogCountStatsDto {
    private List<CountByVisibilityDto> visibilityCounts;
    private List<CountByContentTypeDto> contentTypeCounts;

    public BlogCountStatsDto(List<CountByVisibilityDto> visibilityCounts, List<CountByContentTypeDto> contentTypeCounts) {
        this.visibilityCounts = visibilityCounts;
        this.contentTypeCounts = contentTypeCounts;
    }
}
