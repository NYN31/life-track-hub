CREATE TABLE user
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT,

    firstname          VARCHAR(40)  NOT NULL,
    lastname           VARCHAR(40),
    email              VARCHAR(60)  NOT NULL,
    password           VARCHAR(100) NOT NULL,
    role               VARCHAR(100),
    enabled            BOOLEAN      NOT NULL,
    user_details       BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (email),
    INDEX (email)
)
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_bin;