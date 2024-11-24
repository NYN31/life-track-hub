CREATE TABLE user
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,

    firstname          VARCHAR(40)  NOT NULL,
    lastname           VARCHAR(40),
    email              VARCHAR(60)  NOT NULL UNIQUE KEY,
    password           VARCHAR(100) NOT NULL,
    role               VARCHAR(100),
    enabled            BOOLEAN      NOT NULL,
    user_details       BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    INDEX (email)
);