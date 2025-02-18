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
import java.time.Period;
import java.util.Objects;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    private final Logger log = LoggerFactory.getLogger(getClass());

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

    // TODO: This is for super admin
    @Override
    public Page<Blog> findAll(Integer page, Integer size, String visibility, LocalDate startDate, LocalDate endDate) {
        log.info("Finding all blogs");

        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        if (startDate == null || endDate == null) {
            startDate = LocalDate.now();
            endDate = LocalDate.now().plusDays(1);
        }

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);
        Period period = Period.between(startDate, endDate);

        log.info("Start date: " + start + " End date: " + end + " Difference: " + period.getDays());

        if (visibility == null) {
            return blogRepository.findAllByCreatedDateBetween(start, end, pageable);
        }

        return blogRepository.findAllByVisibilityAndCreatedDateBetween(visibility, start, end, pageable);
    }

    @Override
    public Page<Blog> findBlogsByUserId(Integer page, Integer size, String email, String visibility, LocalDate startDate, LocalDate endDate) {
        log.info("Finding all blogs by id");

        User userFromSecurityContext = Util.getUserFromSecurityContextHolder();

        if (userFromSecurityContext == null) {
            log.warn("Unauthorized user");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
        }

        Long userId = userFromSecurityContext.getId();

        if (!Objects.equals(email, userFromSecurityContext.getEmail())) {
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                userId = user.get().getId();
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
            }
        }

        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        if (startDate == null || endDate == null) {
            startDate = LocalDate.now();
            endDate = LocalDate.now().plusDays(1);
        }

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);

        if (visibility == null) {
            return blogRepository.findAllByUserIdAndCreatedDateBetween(userId, start, end, pageable);
        }

        return blogRepository.findAllByUserIdAndVisibilityAndCreatedDateBetween(userId, visibility, start, end, pageable);
    }

    @Override
    public Page<Blog> findBlogsByTitle(String title, Integer page, Integer size) {
        log.info("Finding blogs by title");

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("title"));
        return blogRepository.findByTitleContaining(title, pageRequest);
    }

    @Override
    public BlogDto findBlogBySlug(String slug) {
        log.info("Finding blog by slug");

        Optional<Blog> blog = blogRepository.findBySlug(slug);
        if (blog.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found by the slug");
        }

        return BlogDto.formEntity(blog.get());
    }
}
