package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.constant.enumeration.TodoStatus;
import com.lifetrackhub.constant.utils.DateUtil;
import com.lifetrackhub.constant.utils.Util;
import com.lifetrackhub.dto.TodoDto;
import com.lifetrackhub.dto.blob.TodoItems;
import com.lifetrackhub.dto.request.TodoSearchRequestDto;
import com.lifetrackhub.dto.response.CommonResponseDto;
import com.lifetrackhub.dto.response.DateRangePageRequest;
import com.lifetrackhub.entity.Todo;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.helper.SearchHelper;
import com.lifetrackhub.repository.TodoRepository;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final int DATE_RANGE_PERIOD_FOR_TODO_SEARCH = 365;
    private static final int MAX_TODO_IN_DAILY = 5;
    private static final int MAX_TODO_ITEMS_IN_A_TODO = 20;

    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    public TodoServiceImpl(UserRepository userRepository, TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Todo> findFilteredTodos(TodoSearchRequestDto dto) {
        log.info("Finding filtered todos");

        Optional<User> optionalUser = Util.getUserFromSecurityContextHolder(userRepository);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to perform this request."
            );
        }
        User user = optionalUser.get();

        DateRangePageRequest dateRangePageRequest =
                SearchHelper.buildDateRangePageRequest(
                        dto.getPage(),
                        dto.getSize(),
                        dto.getStart(),
                        dto.getEnd(),
                        DATE_RANGE_PERIOD_FOR_TODO_SEARCH,
                        "createdDate",
                        Sort.Direction.DESC
                );

        TodoStatus currentTodoStatus = dto.getStatus();

        if (Objects.isNull(currentTodoStatus)) {
            currentTodoStatus = TodoStatus.IN_PROGRESS;
        }

        if (TodoStatus.ARCHIVED.equals(currentTodoStatus)
                && Role.ADMIN.name().equals(user.getRole())) {
            currentTodoStatus = TodoStatus.IN_PROGRESS;
        }

        log.info("Finding all {} blogs of {}, within {} to {}", currentTodoStatus, user.getEmail(), dto.getStart(), dto.getEnd());

        return todoRepository.findAllWithFilter(
                user.getEmail(),
                dto.getTitle(),
                currentTodoStatus,
                dateRangePageRequest.getStart(),
                dateRangePageRequest.getEnd(),
                dateRangePageRequest.getPageable()
        );
    }

    @Override
    public Todo findTodoByEmail(String email) {
        User user = Util.getUserFromSecurityContextHolder(userRepository).get();
        log.info("Find todo by email: {}", email);

        if (!user.getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not belong to this email");
        }

        return todoRepository.findByEmail(user.getEmail())
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Todo does not exist by id: " + user.getEmail()
                        )
                );
    }

    @Override
    public TodoDto addTodo(TodoDto dto) {
        log.info("Adding new todo: {}", dto);

        Optional<User> optionalUser = Util.getUserFromSecurityContextHolder(userRepository);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not belong to this email");
        }
        User user = optionalUser.get();

        Instant startDate = DateUtil.getStartDate(LocalDate.now());
        Instant endDate = DateUtil.getEndDate(LocalDate.now());
        long todayTodoAddCount = todoRepository.countByEmailAndCreatedDateBetween(
                user.getEmail(),
                startDate,
                endDate
        );
        log.info("Total uploaded todo count today: {}", todayTodoAddCount);

        if (user.getAccountType().equals(AccountType.STANDARD)
                && todayTodoAddCount >= MAX_TODO_IN_DAILY) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "You can add a maximum of " + MAX_TODO_IN_DAILY + " todos per day."
            );
        }

        if (dto.getTodoItems().length > MAX_TODO_ITEMS_IN_A_TODO) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "You can add a maximum of " + MAX_TODO_ITEMS_IN_A_TODO + " todo items in per todo.");
        }

        Todo todo = new Todo();
        todo.setEmail(user.getEmail());
        todo.setTitle(dto.getTitle());
        todo.setStatus(TodoStatus.IN_PROGRESS);
        TodoItems todoItems = new TodoItems();
        todoItems.setTodoItems(dto.getTodoItems());
        todo.setTodoItems(todoItems);

        todo = todoRepository.save(todo);
        log.info("Todo added: {}", todo);

        return TodoDto.formEntity(todo);
    }

    @Override
    public TodoDto updateTodo(TodoDto dto) {
        log.info("Updating todo: {}", dto);

        Optional<Todo> optional = todoRepository.findById(dto.getId());
        if (optional.isEmpty()) {
            log.warn("Todo with id {} not found", dto.getId());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo with id " + dto.getId() + " not found");
        }

        if (dto.getTodoItems().length > MAX_TODO_ITEMS_IN_A_TODO) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "You can add a maximum of " + MAX_TODO_ITEMS_IN_A_TODO + " todo items in per todo.");
        }

        Todo todo = optional.get();
        todo.setTitle(dto.getTitle());
        todo.setStatus(dto.getTodoStatus());
        TodoItems todoItems = new TodoItems();
        todoItems.setTodoItems(dto.getTodoItems());
        todo.setTodoItems(todoItems);

        todo = todoRepository.save(todo);
        log.info("Todo updated: {}", todo);

        return TodoDto.formEntity(todo);

    }

    @Override
    public CommonResponseDto archivedTodo(Long id) {
        log.info("Archiving todo item: {}", id);

        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found by id: " + id);
        }
        Todo todo = optionalTodo.get();

        todo.setStatus(TodoStatus.ARCHIVED);
        todoRepository.save(todo);

        return CommonResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Todo is archived")
                .build();
    }
}
