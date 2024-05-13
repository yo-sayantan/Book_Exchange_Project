package com.example.BookExchange.auth.dto;
public class AuthenticationRequest {

	private String username;
	private String password;
	private String accessToken;
	private boolean isGoogleAuth;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public boolean isGoogleAuth() {
		return isGoogleAuth;
	}

	public void setIsGoogleAuth(boolean isGoogleAuth) {
		this.isGoogleAuth = isGoogleAuth;
	}
}