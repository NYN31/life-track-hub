package com.lifetrackhub.controller.userController;

import com.lifetrackhub.dto.response.BlogLikeCountResponseDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.service.BlogLikeService;
import org.springframework.web.bind.annotation.*;

@RestController
public class BlogLikeController extends BaseController {
    private final BlogLikeService blogLikeService;

    public BlogLikeController(BlogLikeService blogLikeService) {
        this.blogLikeService = blogLikeService;
    }

    @PostMapping("/blog/like/{slug}")
    public CommonResponseDto likeUnlikeOperationOfBlog(@PathVariable String slug) {
        return blogLikeService.likeUnlikeOperation(slug);
    }

    @GetMapping("/blog/like/count/{slug}")
    public BlogLikeCountResponseDto countLikes(@PathVariable String slug) {
        return blogLikeService.countLikes(slug);
    }
}
