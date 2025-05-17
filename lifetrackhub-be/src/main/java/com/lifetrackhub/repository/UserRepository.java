package com.lifetrackhub.repository;

import com.lifetrackhub.constant.enumeration.AccountStatus;
import com.lifetrackhub.constant.enumeration.AccountType;
import com.lifetrackhub.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByRole(String role);

    @Query("""
                SELECT u FROM User u
                WHERE (:email IS NULL OR u.email = :email)
                  AND (:role IS NULL OR u.role = :role)
                  AND (:accountStatus IS NULL OR u.accountStatus = :accountStatus)
                  AND (:accountType IS NULL OR u.accountType = :accountType)
                  AND (:startDate IS NULL OR u.createdDate >= :startDate)
                  AND (:endDate IS NULL OR u.createdDate <= :endDate)
            """)
    Page<User> findByEmailAndRoleNameAndAccountStatusAndAccountTypeAndCreatedDateBetween(
            String email,
            String role,
            AccountStatus accountStatus,
            AccountType accountType,
            Instant startDate,
            Instant endDate,
            Pageable pageable
    );
}
