CREATE TABLE file
(
    id                 BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id            BIGINT       NOT NULL,
    file_type          VARCHAR(15)  NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_path          VARCHAR(512) NOT NULL,
    preview_url        VARCHAR(512) NOT NULL,

    created_date       DATETIME     NOT NULL,
    last_modified_date DATETIME     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user (id) on DELETE CASCADE
);