package com.lifetrackhub.service;

import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.entity.Blog;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface BlogService {
    BlogDto create(BlogCreateRequestDto request);

    Page<Blog> findAllBlogs(int page, int size, String email, String visibility, LocalDate startDate, LocalDate endDate);

    Page<Blog> findBlogsByTitle(String title, int page, int size);

    BlogDto findBlogBySlug(String slug);

    Page<Blog> findBlogsByEmail(String email, String visibility, int page, int size);
}
