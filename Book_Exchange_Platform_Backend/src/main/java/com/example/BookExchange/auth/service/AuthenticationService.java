package com.example.BookExchange.auth.service;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.BookExchange.auth.config.UserPrincipal;
import com.example.BookExchange.auth.dto.AuthenticationRequest;
import com.example.BookExchange.auth.dto.AuthenticationResponse;
import com.example.BookExchange.auth.memory.Tokens;
import com.example.BookExchange.auth.model.MFUser;
import com.example.BookExchange.auth.model.Token;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Value;


@Service
public class AuthenticationService {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private JwtService jwtService;
	@Value("${spring.security.oauth2.resourceserver.opaque-token.clientId}")
    private String clientId;

	public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception {
		UserDetails user = null;
		if(request.isGoogleAuth()) {
			String email = extractEmailId(request.getAccessToken());
			user = userDetailsService.loadUserByUserEmail(email);
		}
		else {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
			user = userDetailsService.loadUserByUsername(request.getUsername());
		}
		var jwtToken = jwtService.generateToken(user);
		saveUserToken(user, jwtToken);
		removeUserPassword(user);
		return new AuthenticationResponse(jwtToken, user);
	}

	private void removeUserPassword(UserDetails user) {
		if(user instanceof UserPrincipal) {
			UserPrincipal up = (UserPrincipal) user;
			up.setPassword(null);
			user = up;
		}
	}

	private void saveUserToken(UserDetails user, String jwtToken) {
		Token token = new Token();
		token.setToken(jwtToken);
		token.setUser(user);
		token.setExpired(false);
		Tokens.tokenMap.put(jwtToken, token);
	}
	
	public UserDetails getUserDetailsByToken(String token) throws Exception{
		if(Tokens.tokenMap.get(token) == null) {
			throw new Exception("token not found");
		}
		String userName = jwtService.extractUsername(token);
		UserDetails user = userDetailsService.loadUserByUsername(userName);
		removeUserPassword(user);
		return user;
	}
	
	private String extractEmailId(String accessToken) throws Exception {
        // Create verifier
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();

        GoogleIdToken idToken = verifier.verify(accessToken);
        if (idToken == null) {
            throw new IllegalAccessException("Invalid id_token");
        }
        // Access payload 
        return idToken.getPayload().getEmail();
        
	}
	
	public void signUpUser(MFUser user) {
		userDetailsService.saveUserAndMapRole(user);
	}
}