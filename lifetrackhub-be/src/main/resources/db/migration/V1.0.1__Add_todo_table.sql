CREATE TABLE todo
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT,

    user_id            BIGINT       NOT NULL,
    title              VARCHAR(255) NOT NULL,
    done               BOOLEAN,
    todo_items         BLOB,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    PRIMARY KEY (id)
) CHARACTER SET utf8mb4
  COLLATE utf8mb4_bin;