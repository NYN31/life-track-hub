package com.lifetrackhub.service;

import com.lifetrackhub.constant.enumeration.BlogStatus;
import com.lifetrackhub.dto.BlogCountStatsDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.dto.request.BlogGetRequestDto;
import com.lifetrackhub.dto.request.BlogUpdateRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface BlogService {
    Blog create(BlogCreateRequestDto request);

    Blog update(BlogUpdateRequestDto request);

    Page<Blog> findAllBlogs(BlogGetRequestDto dto);

    Page<Blog> findBlogsByTitle(String title, int page, int size);

    Blog findBlogBySlug(String slug);

    Page<Blog> findBlogsByEmail(String email, BlogStatus status, int page, int size);

    CommonResponseDto softDelete(String slug);

    BlogCountStatsDto getBlogCountStats();
}
