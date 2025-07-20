CREATE TABLE todo
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,

    email              VARCHAR(60)  NOT NULL,
    title              VARCHAR(255) NOT NULL,
    status             VARCHAR(20)  NOT NULL,
    todo_items         BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL
);