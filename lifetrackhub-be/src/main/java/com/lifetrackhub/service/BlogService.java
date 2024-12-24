package com.lifetrackhub.service;

import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.entity.Blog;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface BlogService {
    BlogDto create(BlogCreateRequestDto request);

    Page<Blog> findAll(Integer page, Integer size);

    Page<Blog> findFilteredBlog(Integer page, Integer size, String visibility, LocalDate start, LocalDate end);

    Page<Blog> findBlogsByTitle(String title, Integer page, Integer size);

    BlogDto findBlogBySlug(String slug);
}
