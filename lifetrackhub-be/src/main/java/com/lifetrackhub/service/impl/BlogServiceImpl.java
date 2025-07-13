package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.constant.enumeration.BlogStatus;
import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.RandomUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.BlogCountStatsDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.dto.request.BlogGetRequestDto;
import com.lifetrackhub.dto.request.BlogUpdateRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.CountByStatusDto;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final int DATE_RANGE_PERIOD_FOR_BLOG_SEARCH = 200;

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
        blog.setStatus(request.getStatus());
        blog.setCoverImagePath(request.getCoverImagePath());
        blog.setTags(request.getTags());
        blog.setSlug(request.getTitle().replace(" ", "-") + "-" + RandomUtil.randomStringOfLength(16));
        blog.setUser(userFromSecurityContext);

        return blogRepository.save(blog);
    }

    @Override
    public Blog update(BlogUpdateRequestDto request) {
        log.info("Updating blog");
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();
        Optional<Blog> optionalBlog = blogRepository.getBlogBySlug(request.getSlug());
        if (optionalBlog.isPresent()) {
            Blog blog = optionalBlog.get();

            if (blog.getUser().getId().equals(userFromSecurityContext.getId())) {
                blog.setTitle(request.getTitle());
                blog.setContent(request.getContent());
                blog.setStatus(request.getStatus());
                blog.setCoverImagePath(request.getCoverImagePath());
                blog.setTags(request.getTags());

                return blogRepository.save(blog);
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only update your blogs");
            }
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found");
    }

    @Override
    public Page<Blog> findAllBlogs(BlogGetRequestDto dto) {
        log.info("Finding all {} blogs of {}, within {} to {}", dto.getStatus(), dto.getEmail(), dto.getStart(), dto.getEnd());

        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        Long userId = null;
        if (dto.getEmail() != null) {
            Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
            if (optionalUser.isPresent()) {
                userId = optionalUser.get().getId();
            }
        }

        if (!userFromSecurityContext.getRole().equals(Role.SUPER_ADMIN.name())) {
            dto.setStatus(BlogStatus.PUBLIC);
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date range should be in between 90 days");
        }

        return blogRepository.findAllBlogs(userId, dto.getSlug(), dto.getStatus(), start, end, pageable);
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
    public Page<Blog> findBlogsByEmail(String email, BlogStatus status, int page, int size) {
        log.info("Finding blogs by email {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Users data not found");
        }

        Long userId = user.get().getId();
        Pageable pageable = PageRequest.of(page, size);

        return blogRepository.findAllByUserIdAndStatus(userId, status, pageable);
    }

    @Override
    public CommonResponseDto softDelete(String slug) {
        log.info("Soft delete a blog by slug {}", slug);

        Blog blog = findBlogBySlug(slug);
        blog.setStatus(BlogStatus.DELETED);
        blogRepository.save(blog);

        return CommonResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Soft delete has been successful")
                .build();
    }

    @Override
    public BlogCountStatsDto getBlogCountStats() {
        User user = Util.getUserFromSecurityContextHolder();
        log.info("Getting blog count stats for email {}", user.getEmail());

        Long userId = null;
        if (user.getRole().equals(Role.ADMIN.name())) {
            userId = user.getId();
        }

        List<CountByStatusDto> partialStatusCounts = blogRepository.countGroupByStatus(userId);

        Map<BlogStatus, Long> blogStatusMap = Arrays.stream(BlogStatus.values())
                .collect(Collectors.toMap(v -> v, v -> 0L));

        for (CountByStatusDto dto : partialStatusCounts) {
            blogStatusMap.put(dto.getStatus(), dto.getCount());
        }

        List<CountByStatusDto> visibilityCounts = blogStatusMap.entrySet().stream()
                .map(e -> new CountByStatusDto(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        return new BlogCountStatsDto(visibilityCounts);
    }
}
