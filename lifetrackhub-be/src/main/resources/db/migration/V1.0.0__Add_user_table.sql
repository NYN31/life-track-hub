CREATE TABLE user
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT,

    firstname          VARCHAR(40)  NOT NULL,
    lastname           VARCHAR(40),
    email              VARCHAR(60)  NOT NULL,
    password           VARCHAR(100) NOT NULL,
    role               VARCHAR(100) NOT NULL,
    account_status     VARCHAR(20)  NOT NULL,
    login_type         VARCHAR(20)  NOT NULL,
    account_type       VARCHAR(20)  NOT NULL,
    user_details       BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    PRIMARY KEY (id),
    INDEX (firstname),
    UNIQUE KEY (email)
);