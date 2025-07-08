package com.lifetrackhub.controller.userController;

import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.request.BlogGetRequestDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


@RestController
public class BlogController extends BaseController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/blog/find-all")
    public PageDto<BlogDto> findAll(@RequestBody BlogGetRequestDto dto) {
        Page<Blog> blogs = blogService.findAllBlogs(dto);
        return PageDto.fromEntity(blogs, BlogDto::formEntity);
    }
}
