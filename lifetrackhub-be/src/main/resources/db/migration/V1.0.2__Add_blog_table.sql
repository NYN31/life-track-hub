CREATE TABLE blog
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,

    title              VARCHAR(255) NOT NULL,
    content            TEXT         NOT NULL,
    slug               VARCHAR(255) NOT NULL,
    visibility         VARCHAR(15)  NOT NULL,
    user_id            BIGINT       NOT NULL,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user (id) on DELETE CASCADE
)