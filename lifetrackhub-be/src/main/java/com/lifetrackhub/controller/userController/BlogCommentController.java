package com.lifetrackhub.controller.userController;

import com.lifetrackhub.dto.PageDto;
import com.lifetrackhub.dto.response.BlogCommentResponseDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.BlogComment;
import com.lifetrackhub.service.BlogCommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
public class BlogCommentController extends BaseController {
    private final BlogCommentService blogCommentService;

    public BlogCommentController(BlogCommentService blogCommentService) {
        this.blogCommentService = blogCommentService;
    }

    @GetMapping("/blog/comment")
    public PageDto<BlogCommentResponseDto> getBlogComments(
            @RequestParam(value = "slug") String slug,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<BlogComment> blogComments = blogCommentService.getComments(slug, PageRequest.of(page, size));
        return PageDto.fromEntity(blogComments, BlogCommentResponseDto::formEntity);
    }

    @PostMapping("/blog/comment/add")
    public BlogComment addComment(
            @RequestParam(value = "slug") String slug,
            @RequestParam(value = "content") String content) {
        return blogCommentService.addComment(slug, content);
    }

    @PutMapping("/blog/comment/delete/{commentId}")
    public CommonResponseDto deleteComment(@PathVariable Long commentId) {
        return blogCommentService.deleteComment(commentId);
    }
}
