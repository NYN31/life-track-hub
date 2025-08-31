CREATE TABLE password_reset_token
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,

    token              VARCHAR(100) NOT NULL UNIQUE,
    user_id            BIGINT       NOT NULL,
    is_used            BOOLEAN      NOT NULL DEFAULT FALSE,
    expiration_time    DATETIME     NOT NULL,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user (id) on DELETE CASCADE,

    index (user_id)
);