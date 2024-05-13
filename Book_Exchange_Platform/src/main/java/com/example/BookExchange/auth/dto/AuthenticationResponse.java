package com.example.BookExchange.auth.dto;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthenticationResponse {

	private String token;
	private UserDetails userDetails;
	private String msg;

	public AuthenticationResponse(String token, UserDetails userDetails) {
		super();
		this.token = token;
		this.userDetails = userDetails;
	}
	
	public AuthenticationResponse(String msg) {
		this.msg = msg;
	}
	
	public AuthenticationResponse() {
		super();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}