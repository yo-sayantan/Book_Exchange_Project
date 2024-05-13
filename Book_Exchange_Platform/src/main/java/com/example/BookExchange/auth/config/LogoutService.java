package com.example.BookExchange.auth.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.example.BookExchange.auth.memory.Tokens;
import com.example.BookExchange.auth.model.Token;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class LogoutService implements LogoutHandler {
	
	private static final Logger log = LoggerFactory.getLogger(LogoutService.class);

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		log.info("inside LogoutService()");
		final String authHeader = request.getHeader("Authorization");
		final String jwt = authHeader;
		Token token = Tokens.tokenMap.get(jwt);
		if (token != null) {
			token.setExpired(true);
			Tokens.tokenMap.remove(jwt);
			SecurityContextHolder.clearContext();
		}
		else {
			log.error("no such token with this jwt");
		}

	}
}