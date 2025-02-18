package com.lifetrackhub.controller.adminController;

import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class AdminBlogController extends AdminBaseController {
    private final BlogService blogService;

    public AdminBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/blog/find-by-userId")
    public PageDto<BlogDto> getBlogsByUserId(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String email,
            @RequestParam(required = false) String visibility,
            @RequestParam(value = "start", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(value = "end", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        Page<Blog> blogs = blogService.findBlogsByUserId(page, size, email, visibility, startDate, endDate);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }

    @PostMapping("/blog/create")
    public BlogDto createBlog(@Valid @RequestBody BlogCreateRequestDto request) {
        return blogService.create(request);
    }

    @GetMapping("/blog/by-title/{title}/{page}/{size}")
    public PageDto<BlogDto> findBlogsByTitle(@PathVariable String title, @PathVariable int page, @PathVariable int size) {
        Page<Blog> blogs = blogService.findBlogsByTitle(title, page, size);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }

    @GetMapping("/blog/by-slug/{slug}")
    public BlogDto findBlogsBySlug(@PathVariable String slug) {
        return blogService.findBlogBySlug(slug);
    }
}
