package com.example.BookExchange.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.BookExchange.app.model.Book;

public interface BooksRepository extends JpaRepository<Book, Integer> {
    
	@Query("SELECT b FROM Book b WHERE b.available = :available and b.owner.id != :userId")
    List<Book> findAvailableBooks(@Param("available") boolean available, @Param("userId") Integer userId);
	
	@Query("SELECT b FROM Book b WHERE b.owner.id = :userId")
    List<Book> findBooksUploadedByUser(@Param("userId") Integer userId);
}