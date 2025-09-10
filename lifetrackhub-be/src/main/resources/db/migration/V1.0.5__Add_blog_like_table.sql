CREATE TABLE blog_like
(
    id                 BIGINT      NOT NULL AUTO_INCREMENT,
    blog_id            BIGINT      NOT NULL,
    user_id            BIGINT      NOT NULL,
    like_type          VARCHAR(40) NOT NULL,

    created_date       DATETIME    NOT NULL,
    last_modified_date DATETIME    NOT NULL,

    PRIMARY KEY (id),
    INDEX (blog_id),
    INDEX (user_id),

    FOREIGN KEY (blog_id) REFERENCES blog (id) on DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user (id) on DELETE CASCADE
)