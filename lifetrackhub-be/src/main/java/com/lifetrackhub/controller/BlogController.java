package com.lifetrackhub.controller;

import com.lifetrackhub.constant.enumeration.Visibility;
import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class BlogController extends BaseController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/blog/find-all")
    public PageDto<BlogDto> findAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "start", required = false) LocalDate startDate,
            @RequestParam(value = "end", required = false) LocalDate endDate
    ) {
        String visibility = Visibility.PUBLIC.name();
        Page<Blog> blogs = blogService.findAllBlogs(page, size, email, visibility, startDate, endDate);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }
}
