package com.lifetrackhub.controller.superAdminController;

import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class SuperAdminBlogController extends SuperAdminBaseController {
    private final BlogService blogService;

    public SuperAdminBlogController(final BlogService blogService) {
        this.blogService = blogService;
    }

    @PutMapping("/blog/delete/{slug}")
    public CommonResponseDto softDelete(@PathVariable String slug) {
        return blogService.softDelete(slug);
    }
}
