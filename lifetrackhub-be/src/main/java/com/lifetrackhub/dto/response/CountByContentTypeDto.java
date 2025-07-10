package com.lifetrackhub.dto.response;

import com.lifetrackhub.constant.enumeration.BlogContentType;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class CountByContentTypeDto implements Serializable {
    private String contentType;
    private Long count;

    public CountByContentTypeDto(BlogContentType contentType, Long count) {
        this.contentType = contentType.name();
        this.count = count;
    }
}
