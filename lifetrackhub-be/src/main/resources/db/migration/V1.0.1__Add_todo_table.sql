CREATE TABLE todo
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT,

    email              VARCHAR(60)  NOT NULL,
    title              VARCHAR(255) NOT NULL,
    status             VARCHAR(20)  NOT NULL,
    todo_items         BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    PRIMARY KEY (id),
    INDEX (email),
    INDEX (last_modified_date),
    FULLTEXT INDEX (title)
);