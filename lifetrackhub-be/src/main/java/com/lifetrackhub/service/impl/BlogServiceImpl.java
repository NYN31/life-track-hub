package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.RandomUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
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
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final Integer DATE_RANGE_PERIOD_FOR_BLOG_SEARCH = 30;

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogServiceImpl(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BlogDto create(BlogCreateRequestDto request) {
        log.info("Creating new blog");
        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setVisibility(request.getVisibility());
        blog.setSlug(request.getTitle().replace(" ", "-") + "-" + RandomUtil.randomStringOfLength(16));
        blog.setUser(userFromSecurityContext);

        blog = blogRepository.save(blog);
        return BlogDto.formEntity(blog);
    }

    @Override
    public Page<Blog> findAll(Integer page, Integer size, String visibility, LocalDate startDate, LocalDate endDate) {
        // this is for both user and super admin.
        // for user: visibility will always PUBLIC and
        // for super admin visibility will be dynamic (PUBLIC/PRIVATE)
        log.info("Finding all {} blogs within {} to {}", visibility, startDate, endDate);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));

        if (startDate == null || endDate == null) {
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

        if (visibility == null) {
            return blogRepository.findAllByCreatedDateBetween(start, end, pageable);
        }
        return blogRepository.findAllByVisibilityAndCreatedDateBetween(visibility, start, end, pageable);
    }

    @Override
    public Page<Blog> findBlogsByUserId(Integer page, Integer size, String email, String visibility, LocalDate startDate, LocalDate endDate) {
        log.info("Finding all {} blogs for {}, within {} to {}", visibility, email, startDate, endDate);

        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        if (userFromSecurityContext == null) {
            log.warn("Unauthorized user");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
        }

        Long userId = userFromSecurityContext.getId();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        if (startDate == null || endDate == null) {
            startDate = LocalDate.now().minusDays(DATE_RANGE_PERIOD_FOR_BLOG_SEARCH);
            endDate = LocalDate.now();
        }

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);
        long days = ChronoUnit.DAYS.between(start, end);

        log.info("By user id: Start date - {}, End date - {}, Difference - {}", start, end, days);
        if (days > DATE_RANGE_PERIOD_FOR_BLOG_SEARCH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date range should be in between 30 days");
        }

        if (visibility == null) {
            return blogRepository.findAllByUserIdAndCreatedDateBetween(userId, start, end, pageable);
        }
        return blogRepository.findAllByUserIdAndVisibilityAndCreatedDateBetween(userId, visibility, start, end, pageable);
    }

    @Override
    public Page<Blog> findBlogsByTitle(String title, Integer page, Integer size) {
        log.info("Finding blogs by title {}", title);

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("title"));
        return blogRepository.findByTitleContaining(title, pageRequest);
    }

    @Override
    public BlogDto findBlogBySlug(String slug) {
        log.info("Finding blog by slug {}", slug);

        Optional<Blog> blog = blogRepository.findBySlug(slug);
        if (blog.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found by the slug");
        }

        return BlogDto.formEntity(blog.get());
    }

    @Override
    public Page<Blog> findBlogsByEmail(String email, String visibility, Integer page, Integer size) {
        log.info("Finding blogs by email {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Users data not found");
        }

        Long userId = user.get().getId();
        Pageable pageable = PageRequest.of(page, size);

        return blogRepository.findAllByUserIdAndVisibility(userId, visibility, pageable);
    }
}
