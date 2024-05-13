package com.example.BookExchange.auth.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BookExchange.auth.model.MFUser;

public interface MFUserRepo extends JpaRepository<MFUser, Integer> {
	public MFUser findByUsername(String username);
	public MFUser findByEmail(String email);
}
