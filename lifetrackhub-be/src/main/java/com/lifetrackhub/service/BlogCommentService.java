package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.BlogCommentResponseDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.BlogComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface BlogCommentService {
    BlogCommentResponseDto addComment(String slug, String content);

    BlogCommentResponseDto updateComment(Long commentId, String content);

    Page<BlogComment> getComments(String slug, Pageable pageable);

    long countComments(Long blogId);

    CommonResponseDto deleteComment(Long commentId);
}
