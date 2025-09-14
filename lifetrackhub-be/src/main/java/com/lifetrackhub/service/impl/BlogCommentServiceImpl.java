package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.response.BlogCommentResponseDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.entity.BlogComment;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.BlogCommentRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.BlogCommentService;
import com.lifetrackhub.service.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BlogCommentServiceImpl implements BlogCommentService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final BlogCommentRepository blogCommentRepository;
    private final BlogService blogService;
    private final UserRepository userRepository;

    public BlogCommentServiceImpl(
            BlogCommentRepository blogCommentRepository,
            @Lazy BlogService blogService,
            UserRepository userRepository
    ) {
        this.blogCommentRepository = blogCommentRepository;
        this.blogService = blogService;
        this.userRepository = userRepository;
    }

    @Override
    public BlogCommentResponseDto addComment(String slug, String content) {
        log.info("Adding comment for slug: {} with content: {}", slug, content);

        Blog blog = blogService.findBlogBySlug(slug);
        User user = Util.getUserFromSecurityContext(userRepository);

        BlogComment comment = new BlogComment();
        comment.setBlogId(blog.getId());
        comment.setUser(user);
        comment.setContent(content);
        comment = blogCommentRepository.save(comment);
        return BlogCommentResponseDto.formEntity(comment);
    }

    @Override
    public Page<BlogComment> getComments(String slug, Pageable pageable) {
        log.info("Getting comments for slug: {}", slug);
        Blog blog = blogService.findBlogBySlug(slug);

        return blogCommentRepository.
                findByBlogIdAndIsDeletedFalseOrderByCreatedDateDesc(blog.getId(), pageable);
    }

    @Override
    public CommonResponseDto deleteComment(Long commentId) {
        BlogComment comment = blogCommentRepository.findById(commentId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found with id: " + commentId)
                );

        if (Boolean.TRUE.equals(comment.getIsDeleted())) {
            return CommonResponseDto.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .message("Comment is already deleted.")
                    .build();
        }

        comment.setIsDeleted(true);
        blogCommentRepository.save(comment);

        return CommonResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Comment deleted successfully.")
                .build();
    }


    public long countComments(Long blogId) {
        log.info("Counting comments for blog ID: {}", blogId);

        return blogCommentRepository.countByBlogIdAndIsDeletedFalse(blogId);
    }
}
