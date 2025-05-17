package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.constant.enumeration.Visibility;
import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class PublicBlogController extends PublicBaseController {
    private final BlogService blogService;

    public PublicBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/blog/find-all")
    public PageDto<BlogDto> findAllBlogs(
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

    @GetMapping("/blog/by-title/{title}/{page}/{size}")
    public PageDto<BlogDto> findBlogsByTitle(@PathVariable String title, @PathVariable int page, @PathVariable int size) {
        Page<Blog> blogs = blogService.findBlogsByTitle(title, page, size);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }

    @GetMapping("/blog/by-slug/{slug}")
    public BlogDto findBlogsBySlug(@PathVariable String slug) {
        Blog blog = blogService.findBlogBySlug(slug);
        return BlogDto.formEntity(blog);
    }
}
