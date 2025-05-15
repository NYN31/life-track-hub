package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.constant.enumeration.Visibility;
import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class PublicBlogController extends PublicBaseController {
    private final BlogService blogService;

    public PublicBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/blog/find-all")
    public PageDto<BlogDto> findAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "start", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(value = "end", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        String visibility = Visibility.PUBLIC.name();
        Page<Blog> blogs = blogService.findAll(page, size, visibility, startDate, endDate);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }

    @GetMapping("/blog/find-by-email/${email}")
    public PageDto<BlogDto> findByEmail(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "email") String email
    ) {
        String visibility = Visibility.PUBLIC.name();
        Page<Blog> blogs = blogService.findBlogsByEmail(email, visibility, page, size);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }
}
