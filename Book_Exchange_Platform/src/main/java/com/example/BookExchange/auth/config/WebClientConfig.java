package com.example.BookExchange.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.google.api.client.util.Value;

@Component
public class WebClientConfig {
	
	@Value("${spring.security.oauth2.resourceserver.opaque-token.introspection-uri}")
    private String introspectUri;

    @Bean
    public WebClient userInfoClient() {
        return WebClient.builder().baseUrl(introspectUri).build();
    }
}
