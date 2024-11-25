package com.lifetrackhub.entity;

import com.lifetrackhub.converter.TodoItemsConverter;
import com.lifetrackhub.dto.blob.TodoItems;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
    private Long userId;

    @NotNull
    @Length(min = 3, max = 255)
    private String title;

    private boolean done;

    @Convert(converter = TodoItemsConverter.class)
    @Lob
    private TodoItems todoItems;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdDate;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant lastModifiedDate;
}
