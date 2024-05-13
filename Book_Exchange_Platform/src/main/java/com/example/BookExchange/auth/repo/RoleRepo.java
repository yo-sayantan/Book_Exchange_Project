package com.example.BookExchange.auth.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BookExchange.auth.model.MFRole;

public interface RoleRepo extends JpaRepository<MFRole, Integer>{

}