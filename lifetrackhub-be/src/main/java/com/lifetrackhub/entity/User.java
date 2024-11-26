package com.lifetrackhub.entity;

import com.lifetrackhub.converter.UserDetailsConverter;
import com.lifetrackhub.dto.blob.UserDetails;
import com.lifetrackhub.validation.Email;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import java.time.Instant;

@Data
@ToString
@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Length(min = 3, max = 40)
    private String firstname;

    private String lastname;

    @NotNull
    @Length(min = 3, max = 40)
    @Email
    private String email;

    @NotNull
    private String password;

    private String role;

    @NotNull
    private boolean enabled;

    @Convert(converter = UserDetailsConverter.class)
    private UserDetails userDetails;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdDate;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant lastModifiedDate;
}
