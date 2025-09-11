CREATE TABLE blog_comment
(
    id                 BIGINT     NOT NULL AUTO_INCREMENT,
    blog_id            BIGINT     NOT NULL,
    user_id            BIGINT     NOT NULL,
    content            TEXT       NOT NULL,
    is_deleted         TINYINT(1) NOT NULL DEFAULT 0,
    created_date       DATETIME   NOT NULL,
    last_modified_date DATETIME   NOT NULL,

    PRIMARY KEY (id),
    INDEX (blog_id),
    INDEX (user_id),
    INDEX (created_date),

    FOREIGN KEY (blog_id) REFERENCES blog (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);
