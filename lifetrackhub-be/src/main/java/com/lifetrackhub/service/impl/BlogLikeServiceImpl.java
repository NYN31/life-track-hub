package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.LikeType;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.entity.BlogLike;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.BlogLikeRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.BlogLikeService;
import com.lifetrackhub.service.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class BlogLikeServiceImpl implements BlogLikeService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final int BLOCK_TIME_FOR_LIKE_AND_UNLIKE_OPERATION_IN_MINUTES = 5;

    private final BlogLikeRepository blogLikeRepository;
    private final UserRepository userRepository;
    private final BlogService blogService;

    public BlogLikeServiceImpl(
            BlogLikeRepository blogLikeRepository,
            UserRepository userRepository,
            @Lazy BlogService blogService
    ) {
        this.blogLikeRepository = blogLikeRepository;
        this.userRepository = userRepository;
        this.blogService = blogService;
    }

    @Override
    public CommonResponseDto likeUnlikeOperation(String slug) {
        log.info("Toggling like status for blog with slug '{}'", slug);

        Blog blog = blogService.findBlogBySlug(slug);
        User user = Util.getUserFromSecurityContext(userRepository);

        BlogLike blogLike = blogLikeRepository
                .findByBlogIdAndUserId(blog.getId(), user.getId())
                .map(this::toggleExistingLike)
                .orElseGet(() -> createNewLike(blog.getId(), user.getId()));

        blogLikeRepository.save(blogLike);

        return CommonResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Operation has been successful")
                .build();
    }

    @Override
    public long countLikes(Long blogId) {
        log.info("Count of likes by blog ID {}", blogId);

        return blogLikeRepository.countByBlogIdAndLikeType(blogId, LikeType.LIKED);
    }

    private BlogLike toggleExistingLike(BlogLike blogLike) {
        checkEligibilityOfLikeAndUnlikeBlog(blogLike.getLastModifiedDate());
        blogLike.setLikeType(
                blogLike.getLikeType() == LikeType.LIKED
                        ? LikeType.UNLIKED
                        : LikeType.LIKED
        );
        return blogLike;
    }

    private BlogLike createNewLike(Long blogId, Long userId) {
        BlogLike newLike = new BlogLike();
        newLike.setBlogId(blogId);
        newLike.setUserId(userId);
        newLike.setLikeType(LikeType.LIKED);
        return newLike;
    }

    private void checkEligibilityOfLikeAndUnlikeBlog(Instant lastModifiedDate) {
        long currentBlockingTimeGone = ChronoUnit.MINUTES.between(lastModifiedDate, Instant.now());
        long remainingBlockingTimeToPerformOperation =
                BLOCK_TIME_FOR_LIKE_AND_UNLIKE_OPERATION_IN_MINUTES - currentBlockingTimeGone;

        log.info("{} minutes remaining to perform operation", remainingBlockingTimeToPerformOperation);

        if (remainingBlockingTimeToPerformOperation > 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "You will make this operation after " + remainingBlockingTimeToPerformOperation + " minutes."
            );
        }
    }
}
