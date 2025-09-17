CREATE TABLE user_verification_token
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT,
    token              VARCHAR(255) NOT NULL,
    user_id            BIGINT       NOT NULL,
    expiration_time    DATETIME     NOT NULL,
    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    PRIMARY KEY (id),
    INDEX (user_id),
    INDEX (last_modified_date),

    FOREIGN KEY (user_id) REFERENCES user (id)
);
