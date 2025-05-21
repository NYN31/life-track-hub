package com.lifetrackhub.repository;

import com.lifetrackhub.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);

    int countByUserIdAndCreatedDateBetween(Long userId, Instant createdDateAfter, Instant createdDateBefore);

    @Query("""
            SELECT count(prt) > 0 FROM PasswordResetToken prt
            WHERE prt.token = :token
            AND :currentTime <= prt.expirationTime
            AND prt.isUsed = false
            """)
    boolean isTokenValid(String token, Instant currentTime);
}
