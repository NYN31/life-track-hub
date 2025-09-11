package com.lifetrackhub.service;

import com.lifetrackhub.dto.BlogCountStatsDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.dto.request.SelfBlogSearchRequestDto;
import com.lifetrackhub.dto.request.BlogSearchRequestDto;
import com.lifetrackhub.dto.request.BlogUpdateRequestDto;
import com.lifetrackhub.dto.response.BlogLikeCommentCountResponseDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface BlogService {
    Blog create(BlogCreateRequestDto request);

    Blog update(BlogUpdateRequestDto request);

    Page<Blog> findBlogsForUnauthenticatedUser(BlogSearchRequestDto dto);

    Page<Blog> findAllBlogs(BlogSearchRequestDto dto);

    Page<Blog> findBlogsByTitle(String title, int page, int size);

    Blog findBlogBySlug(String slug);

    Page<Blog> findSelfBlogs(SelfBlogSearchRequestDto request);

    CommonResponseDto softDelete(String slug);

    BlogCountStatsDto getBlogCountStats();

    BlogLikeCommentCountResponseDto countLikeAndComment(String slug);
}
