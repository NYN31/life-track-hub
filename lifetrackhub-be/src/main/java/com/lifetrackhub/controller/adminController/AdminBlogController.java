package com.lifetrackhub.controller.adminController;

import com.lifetrackhub.dto.BlogCountStatsDto;
import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.dto.request.SelfBlogSearchRequestDto;
import com.lifetrackhub.dto.request.BlogUpdateRequestDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminBlogController extends AdminBaseController {
    private final BlogService blogService;

    public AdminBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/blog/create")
    public BlogDto createBlog(@Valid @RequestBody BlogCreateRequestDto request) {
        Blog blog = blogService.create(request);
        return BlogDto.formEntity(blog);
    }

    @PutMapping("/blog/update")
    public BlogDto updateBlog(@Valid @RequestBody BlogUpdateRequestDto request) {
        Blog blog = blogService.update(request);
        return BlogDto.formEntity(blog);
    }

    @GetMapping("/blog/stats")
    public BlogCountStatsDto getBlogCountStats() {
        return blogService.getBlogCountStats();
    }

    @PostMapping("/blog/self")
    public PageDto<BlogDto> getSelfBlogs(@Valid @RequestBody SelfBlogSearchRequestDto request) {
        Page<Blog> blogs = blogService.findSelfBlogs(request);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }
}
