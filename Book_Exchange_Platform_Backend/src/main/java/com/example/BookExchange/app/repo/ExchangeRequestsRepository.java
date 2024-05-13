package com.example.BookExchange.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.BookExchange.app.model.ExchangeRequest;

public interface ExchangeRequestsRepository extends JpaRepository<ExchangeRequest, Integer> {
	
	@Query("SELECT er FROM ExchangeRequest er WHERE er.ownerUser.id = :userId OR er.requestingUser.id = :userId")
    List<ExchangeRequest> getAllExchangeRequests(@Param("userId") Integer userId);
	
	@Query("SELECT er FROM ExchangeRequest er WHERE er.status = 'Pending' and er.transaction_type = 'EXCHANGE' and er.requestedBook.owner.id = :userId")
    List<ExchangeRequest> getAllRequestsFromUser(@Param("userId") Integer userId);
	
	@Query("SELECT er FROM ExchangeRequest er WHERE er.requestingUser.id = :userId")
    List<ExchangeRequest> getAllRequestsForAUser(@Param("userId") Integer userId);
}