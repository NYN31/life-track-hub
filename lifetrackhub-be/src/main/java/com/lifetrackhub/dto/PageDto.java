package com.lifetrackhub.dto;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

public class PageDto<D> {
    private final List<D> content;

    private final int pageNumber;

    private final boolean hasNext;

    private final boolean hasPrevious;

    private final int totalPages;

    public PageDto(Page<D> page) {
        this.content = page.getContent();
        this.pageNumber = page.getNumber();
        this.hasNext = page.hasNext();
        this.hasPrevious = page.hasPrevious();
        this.totalPages = page.getTotalPages();
    }

    public static <E, D> PageDto<D> fromEntity(Page<E> page, Function<E, D> converter) {
        Page<D> mapped = page.map(converter);
        return new PageDto<>(mapped);
    }

    public List<D> getContent() {
        return content;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public boolean isHasNext() {
        return hasNext;
    }

    public boolean isHasPrevious() {
        return hasPrevious;
    }

    public int getTotalPages() {
        return totalPages;
    }
}
