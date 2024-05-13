package com.example.BookExchange.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.BookExchange.auth.service.JwtService;

@RestController
public class BaseController {

	@Autowired
	private JwtService jwtService;
	
	private String getToken() {
		String token = null;
		ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes();
		if (requestAttributes != null) {
			token = requestAttributes.getRequest().getHeader("Authorization");
		}
		return token;
	}

	public String getUserName() {
		return jwtService.extractUsername(getToken());
	}
	
	public Integer getUserId() {
		return Integer.parseInt(jwtService.extractUserId(getToken()));
	}

}