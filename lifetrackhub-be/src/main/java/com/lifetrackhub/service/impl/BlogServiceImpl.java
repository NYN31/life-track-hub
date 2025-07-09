package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.Visibility;
import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.RandomUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.dto.request.BlogGetRequestDto;
import com.lifetrackhub.dto.request.BlogUpdateRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.BlogRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final int DATE_RANGE_PERIOD_FOR_BLOG_SEARCH = 90;

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogServiceImpl(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Blog create(BlogCreateRequestDto request) {
        log.info("Creating new blog");
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setVisibility(request.getVisibility());
        blog.setCoverImagePath(request.getCoverImagePath());
        blog.setTags(request.getTags());
        blog.setSlug(request.getTitle().replace(" ", "-") + "-" + RandomUtil.randomStringOfLength(16));
        blog.setContentType(request.getBlogContentType());
        blog.setUser(userFromSecurityContext);

        return blogRepository.save(blog);
    }

    @Override
    public Blog update(BlogUpdateRequestDto request) {
        log.info("Updating blog");

        Optional<Blog> optionalBlog = blogRepository.getBlogBySlug(request.getSlug());
        if (optionalBlog.isPresent()) {
            Blog blog = optionalBlog.get();

            blog.setTitle(request.getTitle());
            blog.setContent(request.getContent());
            blog.setVisibility(request.getVisibility());
            blog.setCoverImagePath(request.getCoverImagePath());
            blog.setTags(request.getTags());
            blog.setContentType(request.getBlogContentType());

            return blogRepository.save(blog);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found");
    }

    @Override
    public Page<Blog> findAllBlogs(BlogGetRequestDto dto) {
        log.info("Finding all {} blogs of {}, within {} to {}", dto.getVisibility(), dto.getEmail(), dto.getStart(), dto.getEnd());

        Long userId = null;
        if (dto.getEmail() != null) {
            Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
            if (optionalUser.isPresent()) {
                userId = optionalUser.get().getId();
            }
        }

        Pageable pageable = PageRequest.of(dto.getPage(), dto.getSize(), Sort.by(Sort.Direction.DESC, "createdDate"));

        LocalDate startDate = dto.getStart(), endDate = dto.getEnd();
        if (Objects.isNull(startDate) || Objects.isNull(endDate)) {
            startDate = LocalDate.now().minusDays(DATE_RANGE_PERIOD_FOR_BLOG_SEARCH);
            endDate = LocalDate.now();
        }

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);
        long days = ChronoUnit.DAYS.between(start, end);

        log.info("Start date - {}, End date - {}, Difference - {}", start, end, days);
        if (days > DATE_RANGE_PERIOD_FOR_BLOG_SEARCH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date range should be in between 30 days");
        }

        return blogRepository.findAllBlogs(userId, dto.getSlug(), dto.getVisibility(), dto.getBlogContentType(), start, end, pageable);
    }

    @Override
    public Page<Blog> findBlogsByTitle(String title, int page, int size) {
        log.info("Finding blogs by title {}", title);

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("title"));
        return blogRepository.findByTitleContaining(title, pageRequest);
    }

    @Override
    public Blog findBlogBySlug(String slug) {
        log.info("Finding blog by slug {}", slug);

        Optional<Blog> blog = blogRepository.findBySlug(slug);
        if (blog.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found by the slug");
        }

        return blog.get();
    }

    @Override
    public Page<Blog> findBlogsByEmail(String email, String visibility, int page, int size) {
        log.info("Finding blogs by email {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Users data not found");
        }

        Long userId = user.get().getId();
        Pageable pageable = PageRequest.of(page, size);

        return blogRepository.findAllByUserIdAndVisibility(userId, visibility, pageable);
    }

    @Override
    public CommonResponseDto softDelete(String slug) {
        log.info("Soft delete a blog by slug {}", slug);

        Blog blog = findBlogBySlug(slug);
        blog.setVisibility(Visibility.DELETED.name());
        blogRepository.save(blog);

        return CommonResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Soft delete has been successful")
                .build();
    }
}
