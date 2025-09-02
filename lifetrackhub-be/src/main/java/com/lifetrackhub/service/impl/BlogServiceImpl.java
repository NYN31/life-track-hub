package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.constant.enumeration.BlogStatus;
import com.lifetrackhub.constant.utils.RandomUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.BlogCountStatsDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.dto.request.SelfBlogSearchRequestDto;
import com.lifetrackhub.dto.request.BlogSearchRequestDto;
import com.lifetrackhub.dto.request.BlogUpdateRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.CountByStatusDto;
import com.lifetrackhub.dto.response.DateRangePageRequest;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.helper.SearchHelper;
import com.lifetrackhub.repository.BlogRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final int DATE_RANGE_PERIOD_FOR_BLOG_SEARCH = 365;

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogServiceImpl(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Blog create(BlogCreateRequestDto request) {
        log.info("Creating new blog");

        Optional<User> userFromSecurityContext =
                Util.getUserFromSecurityContextHolder(userRepository);

        if (userFromSecurityContext.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to perform this request."
            );
        }
        User user = userFromSecurityContext.get();

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setStatus(request.getStatus());
        blog.setCoverImagePath(request.getCoverImagePath());
        blog.setTags(request.getTags());
        blog.setSlug(request.getTitle().replace(" ", "-") + "-" + RandomUtil.randomStringOfLength(16));
        blog.setUser(user);

        return blogRepository.save(blog);
    }

    @Override
    public Blog update(BlogUpdateRequestDto request) {
        log.info("Updating blog");
        Optional<User> optionalUser = Util.getUserFromSecurityContextHolder(userRepository);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in");
        }
        User userFromSecurityContext = optionalUser.get();

        Optional<Blog> optionalBlog = blogRepository.getBlogBySlug(request.getSlug());
        if (optionalBlog.isPresent()) {
            Blog blog = optionalBlog.get();

            if (userFromSecurityContext.getRole().equals(Role.SUPER_ADMIN.name()) ||
                    blog.getUser().getId().equals(userFromSecurityContext.getId())
            ) {
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
    public Page<Blog> findBlogsForUnauthenticatedUser(BlogSearchRequestDto dto) {
        log.info("Finding all {} blogs of {}, within {} to {} for unauthenticated user", dto.getStatus(), dto.getEmail(), dto.getStart(), dto.getEnd());

        DateRangePageRequest dateRangePageRequest =
                SearchHelper.buildDateRangePageRequest(
                        dto.getPage(),
                        dto.getSize(),
                        null,
                        null,
                        DATE_RANGE_PERIOD_FOR_BLOG_SEARCH,
                        null,
                        null
                );

        return blogRepository.findAllBlogs(
                null,
                null,
                null,
                BlogStatus.PUBLIC.name(),
                dateRangePageRequest.getStart(),
                dateRangePageRequest.getEnd(),
                dateRangePageRequest.getPageable()
        );
    }

    @Override
    public Page<Blog> findAllBlogs(BlogSearchRequestDto dto) {
        log.info("Finding all {} blogs of {}, within {} to {}", dto.getStatus(), dto.getEmail(), dto.getStart(), dto.getEnd());

        Optional<User> userFromSecurityContextOpt =
                Util.getUserFromSecurityContextHolder(userRepository);

        if (userFromSecurityContextOpt.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to perform this request."
            );
        }
        User user = userFromSecurityContextOpt.get();

        Long userId = null;
        if (dto.getEmail() != null) {
            userId = userRepository.findByEmail(dto.getEmail())
                    .map(User::getId)
                    .orElse(null);
        }

        String currentStatus = Optional.ofNullable(dto.getStatus())
                .map(Enum::name)
                .orElse(null);

        if (!Role.SUPER_ADMIN.name().equals(user.getRole())) {
            currentStatus = BlogStatus.PUBLIC.name();
        }

        DateRangePageRequest dateRangePageRequest =
                SearchHelper.buildDateRangePageRequest(
                        dto.getPage(),
                        dto.getSize(),
                        dto.getStart(),
                        dto.getEnd(),
                        DATE_RANGE_PERIOD_FOR_BLOG_SEARCH,
                        null,
                        null
                );

        log.info("User Id - {}, Keywords - {}, Status - {}", userId, dto.getKeywords(), currentStatus);

        return blogRepository.findAllBlogs(
                userId,
                dto.getKeywords(),
                dto.getSlug(),
                currentStatus,
                dateRangePageRequest.getStart(),
                dateRangePageRequest.getEnd(),
                dateRangePageRequest.getPageable()
        );
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
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Blog not found by the slug"
            );
        }

        return blog.get();
    }

    @Override
    public Page<Blog> findSelfBlogs(SelfBlogSearchRequestDto dto) {
        log.info("Find self blogs");

        Optional<User> userFromSecurityContextOpt =
                Util.getUserFromSecurityContextHolder(userRepository);

        if (userFromSecurityContextOpt.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to perform this request."
            );
        }
        Long userId = userFromSecurityContextOpt.get().getId();

        DateRangePageRequest dateRangePageRequest =
                SearchHelper.buildDateRangePageRequest(
                        dto.getPage(),
                        dto.getSize(),
                        dto.getStart(),
                        dto.getEnd(),
                        DATE_RANGE_PERIOD_FOR_BLOG_SEARCH,
                        "createdDate",
                        Sort.Direction.DESC
                );

        return blogRepository.
                findSelfBlogs(
                        userId,
                        dto.getStatus(),
                        dateRangePageRequest.getStart(),
                        dateRangePageRequest.getEnd(),
                        dateRangePageRequest.getPageable()
                );
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
        Optional<User> optionalUser = Util.getUserFromSecurityContextHolder(userRepository);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to perform this request."
            );
        }
        User user = optionalUser.get();
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
