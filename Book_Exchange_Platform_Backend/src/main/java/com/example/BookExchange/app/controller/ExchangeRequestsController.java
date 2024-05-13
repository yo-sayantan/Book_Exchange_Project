package com.example.BookExchange.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BookExchange.app.model.Book;
import com.example.BookExchange.app.model.ExchangeRequest;
import com.example.BookExchange.app.service.BooksService;
import com.example.BookExchange.app.service.ExchangeRequestsService;
import com.example.BookExchange.auth.model.MFUser;
import com.example.BookExchange.auth.service.MFUserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ExchangeRequestsController extends BaseController {

    @Autowired
    private ExchangeRequestsService exchangeRequestsService;
    
    @Autowired
    private BooksService booksService;
    
    @Autowired
    private MFUserService userService;

    @GetMapping("getAllExchangeRequests")
    public ResponseEntity<List<ExchangeRequest>> getAllExchangeRequests() {
        List<ExchangeRequest> exchangeRequests = exchangeRequestsService.getAllExchangeRequests(getUserId());
        return ResponseEntity.ok(exchangeRequests);
    }
    
    @GetMapping("getAllRequestsForAUser")
    public ResponseEntity<List<ExchangeRequest>> getAllRequestsForAUser() {
        Optional<List<ExchangeRequest>> exchangeRequestsOptional = Optional.ofNullable(exchangeRequestsService.getAllRequestsForAUser(getUserId()));
        if (exchangeRequestsOptional.isPresent())
            return ResponseEntity.ok(exchangeRequestsOptional.get());
        
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("getAllRequestsFromUser")
    public ResponseEntity<List<ExchangeRequest>> getAllRequestsFromUser() {
        Optional<List<ExchangeRequest>> exchangeRequestsOptional = Optional.ofNullable(exchangeRequestsService.getAllRequestsFromUser(getUserId()));
        if (exchangeRequestsOptional.isPresent())
            return ResponseEntity.ok(exchangeRequestsOptional.get());
            
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExchangeRequest> getExchangeRequestById(@PathVariable Integer id) {
        Optional<ExchangeRequest> exchangeRequestOptional = Optional.ofNullable(exchangeRequestsService.getExchangeRequestById(id));
        if (exchangeRequestOptional.isPresent())
            return ResponseEntity.ok(exchangeRequestOptional.get());
        
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("rentBook")
    public ResponseEntity<ExchangeRequest> rentBook(@RequestBody Map<String, Integer> map) {
    	ExchangeRequest exchangeRequest = new ExchangeRequest();
        Book book = booksService.getBookById(map.get("id"));
	    
        exchangeRequest.setRequestedBook(book);
        exchangeRequest.setRequestingUser(userService.getUserByUsername(getUserName()));
        
    	if(map.get("exchangeId") != null) {
    		Book exchangeBook = booksService.getBookById(map.get("exchangeId"));
	        exchangeRequest.setStatus("Pending");
	        exchangeRequest.setTransaction_type("EXCHANGE");
	        exchangeRequest.setExchangedBook(exchangeBook);
    	} else {
	        exchangeRequest.setStatus("Approved");
	        exchangeRequest.setTransaction_type("RENT");
	        exchangeRequest.setOwnerUser(book.getOwner());
	        booksService.updateAvailabilityStatus(book.getId(), false);
    	}
        
        ExchangeRequest newExchangeRequest = exchangeRequestsService.addExchangeRequest(exchangeRequest);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(newExchangeRequest);
    }
    
    @PostMapping("updateExchangeRequest")
    public ResponseEntity<ExchangeRequest> updateExchangeRequest(@RequestBody Map<String, Integer> map) {
    	ExchangeRequest exchangeRequest = exchangeRequestsService.getExchangeRequestById(map.get("exchangeId"));
    	Book exchangeBook = exchangeRequest.getExchangedBook();
	    Book requestedBook = exchangeRequest.getRequestedBook();
	    
    	if(map.get("status") == 0) {
    		exchangeRequest.setStatus("Rejected");
    		exchangeRequest.setOwnerUser(requestedBook.getOwner());
    	} else if(map.get("status") == 1) {
    	    MFUser exchangeBookOwner = exchangeRequest.getExchangedBook().getOwner();
    	    MFUser requestedBookOwner = exchangeRequest.getRequestedBook().getOwner();
	        
	        exchangeRequest.setOwnerUser(requestedBook.getOwner());
	        booksService.updateAvailabilityStatus(exchangeBook.getId(), true);
	        booksService.updateAvailabilityStatus(requestedBook.getId(), false);
	        
	        exchangeBook.setOwner(requestedBookOwner);
    	    requestedBook.setOwner(exchangeBookOwner);
	        booksService.updateBook(requestedBook);
	        booksService.updateBook(exchangeBook);
	        exchangeRequest.setStatus("Approved");
    	}
    	
        ExchangeRequest newExchangeRequest = exchangeRequestsService.addExchangeRequest(exchangeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(newExchangeRequest);
    }
}
