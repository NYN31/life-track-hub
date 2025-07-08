package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.request.BlogGetRequestDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class PublicBlogController extends PublicBaseController {
    private final BlogService blogService;

    public PublicBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/blog/find-all")
    public PageDto<BlogDto> findAllBlogs(@RequestBody BlogGetRequestDto dto) {
        Page<Blog> blogs = blogService.findAllBlogs(dto);
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
