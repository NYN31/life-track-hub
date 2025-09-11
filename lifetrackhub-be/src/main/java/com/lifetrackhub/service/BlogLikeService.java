package com.lifetrackhub.service;

import com.lifetrackhub.dto.response.CommonResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface BlogLikeService {
    CommonResponseDto likeUnlikeOperation(String slug);

    long countLikes(Long blogId);
}
