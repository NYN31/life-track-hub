CREATE TABLE blog_like
(
    id                 BIGINT      NOT NULL AUTO_INCREMENT PRIMARY KEY,

    like_type          VARCHAR(15) NOT NULL,
    blog_id            BIGINT      NOT NULL,
    user_id            BIGINT      NOT NULL,

    created_date       DATETIME    NOT NULL,
    last_modified_date DATETIME    NOT NULL,

    FOREIGN KEY (blog_id) REFERENCES blog (id) on DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user (id) on DELETE CASCADE
)