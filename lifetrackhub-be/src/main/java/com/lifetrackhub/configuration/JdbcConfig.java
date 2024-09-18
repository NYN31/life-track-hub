package com.lifetrackhub.configuration;


import com.lifetrackhub.converter.TodoItemsReadingConverter;
import com.lifetrackhub.converter.TodoItemsWritingConverter;
import com.lifetrackhub.converter.UserDetailsReadingConverter;
import com.lifetrackhub.converter.UserDetailsWritingConverter;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.core.convert.JdbcCustomConversions;
import org.springframework.data.jdbc.repository.config.AbstractJdbcConfiguration;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.lang.NonNull;

import java.util.List;

@Configuration
@EnableJdbcAuditing
public class JdbcConfig {

    static class CustomJdbcConfiguration extends AbstractJdbcConfiguration {

        @Bean
        @NonNull
        @Override
        public JdbcCustomConversions jdbcCustomConversions() {
            List<?> list = List.of(
                    new UserDetailsReadingConverter(),
                    new UserDetailsWritingConverter(),
                    new TodoItemsReadingConverter(),
                    new TodoItemsWritingConverter()
            );

            return new JdbcCustomConversions(list);
        }
    }
}
