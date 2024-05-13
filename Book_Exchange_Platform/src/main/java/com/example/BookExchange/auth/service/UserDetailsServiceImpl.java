package com.example.BookExchange.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.BookExchange.auth.config.UserPrincipal;
import com.example.BookExchange.auth.model.MFRole;
import com.example.BookExchange.auth.model.MFUser;
import com.example.BookExchange.auth.model.MapRoleUser;
import com.example.BookExchange.auth.repo.MFUserRepo;
import com.example.BookExchange.auth.repo.MapRoleUserRepo;
import com.example.BookExchange.auth.repo.RoleRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private MFUserRepo userRepo;
	@Autowired
	private MapRoleUserRepo mapRoleUserRepo;
	@Autowired
	private RoleRepo roleRepo;
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MFUser user = userRepo.findByUsername(username);
		if (user == null)
			throw new UsernameNotFoundException(username + " not found");

		return extractUserDetails(user);
	}
	
	public UserDetails loadUserByUserEmail(String email) throws UsernameNotFoundException {
		MFUser user = userRepo.findByEmail(email);
		if(user == null)
			throw new UsernameNotFoundException(email + " not found");
		
		return extractUserDetails(user);
	}
	
	private UserDetails extractUserDetails(MFUser user) {
		MapRoleUser mapRoleUser = mapRoleUserRepo.findByUser(user);
		return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(),
				mapRoleUser.getRole().getRoleName(), user.getFullname());
	}
	
	public void saveUserAndMapRole(MFUser user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
	    MFUser dbSavedUser = userRepo.save(user);
	    MFRole customerRole = roleRepo.findById(2).orElseThrow(() -> new RuntimeException("Customer role not found"));
	    MapRoleUser mapRoleUser = new MapRoleUser();
	    mapRoleUser.setUser(dbSavedUser);
	    mapRoleUser.setRole(customerRole);
	    mapRoleUserRepo.save(mapRoleUser);
	}

}