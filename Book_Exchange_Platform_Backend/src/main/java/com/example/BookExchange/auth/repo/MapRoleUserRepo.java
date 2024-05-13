package com.example.BookExchange.auth.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BookExchange.auth.model.MFUser;
import com.example.BookExchange.auth.model.MapRoleUser;

public interface MapRoleUserRepo extends JpaRepository<MapRoleUser, Integer>{
	public MapRoleUser findByUser(MFUser user);
}