package com.lifetrackhub.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Data
@ToString
@Entity
@Table
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private String slug;

    @Column(nullable = false)
    private String visibility;

    @Column(nullable = false)
    private String coverImagePath;

    @Column(nullable = false)
    private String tags;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdDate;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant lastModifiedDate;
}
