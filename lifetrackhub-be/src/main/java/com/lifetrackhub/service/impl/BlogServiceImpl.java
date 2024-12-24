package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.RandomUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.BlogDto;
import com.lifetrackhub.dto.request.BlogCreateRequestDto;
import com.lifetrackhub.entity.Blog;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.BlogRepository;
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
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final BlogRepository blogRepository;

    public BlogServiceImpl(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
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
    public Page<Blog> findAll(Integer page, Integer size) {
        log.info("Finding all blogs");

        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);
        return blogRepository.findAll(pageable);
    }

    @Override
    public Page<Blog> findFilteredBlog(Integer page, Integer size, String visibility, LocalDate startDate, LocalDate endDate) {
        log.info("Finding all filtered blogs");

        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        Instant start = DateUtil.getStartDate(startDate);
        Instant end = DateUtil.getEndDate(endDate);
        log.info("Start date: " + start + " and end date: " + end);

        return blogRepository.findAllByVisibilityAndCreatedDateBetween(visibility, start, end, pageable);
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
