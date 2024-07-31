package com.lifetrackhub.dto;

import com.lifetrackhub.entity.BaseEntity;

import java.time.Instant;

public class BaseDto {

    protected Long id;

    protected Instant createdDate;

    protected Instant lastModifiedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "BaseDto{" +
                "id=" + id +
                ", createdDate=" + createdDate +
                ", lastModifiedDate=" + lastModifiedDate +
                '}';
    }

    public void fill(BaseEntity entity) {
        setId(entity.getId());
        setCreatedDate(entity.getCreatedDate());
        setLastModifiedDate(entity.getLastModifiedDate());
    }
}
