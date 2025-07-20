package com.lifetrackhub.entity;

import com.lifetrackhub.constant.enumeration.TodoStatus;
import com.lifetrackhub.converter.TodoItemsConverter;
import com.lifetrackhub.dto.blob.TodoItems;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import java.time.Instant;

@Data
@ToString
@Entity
@Table
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    @Length(min = 3, max = 255)
    private String title;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TodoStatus status;

    @Convert(converter = TodoItemsConverter.class)
    private TodoItems todoItems;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdDate;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant lastModifiedDate;
}
