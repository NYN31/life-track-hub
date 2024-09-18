CREATE TABLE todo
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,

    user_id            BIGINT       NOT NULL,
    title              VARCHAR(255) NOT NULL,
    done               BOOLEAN,
    todo_items         BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL
);