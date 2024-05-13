package com.example.BookExchange.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BookExchange.app.model.Book;
import com.example.BookExchange.app.service.BooksService;
import com.example.BookExchange.auth.service.MFUserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BooksController extends BaseController {

    @Autowired
    private BooksService booksService;
    @Autowired
    private MFUserService userService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = booksService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        Optional<Book> bookOptional = Optional.ofNullable(booksService.getBookById(id));
        if (bookOptional.isPresent())
            return ResponseEntity.ok(bookOptional.get());
        
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("getAllBooksForAUser")
    public ResponseEntity<List<Book>> getAllBooksForAUser() {
        Optional<List<Book>> bookOptional = Optional.ofNullable(booksService.getAllBooksForAUser(getUserId()));
        if (bookOptional.isPresent())
            return ResponseEntity.ok(bookOptional.get());
        
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("getAllAvailableBooks")
    public ResponseEntity<List<Book>> getAllAvailableBooks() {
        Optional<List<Book>> bookOptional = Optional.ofNullable(booksService.getAllAvailableBooks(getUserId()));
        if (bookOptional.isPresent())
            return ResponseEntity.ok(bookOptional.get());
        
        return ResponseEntity.notFound().build();
    }

    @PostMapping("addBook")
    public ResponseEntity<String> addBook(@RequestBody Book book) {
        if(book.getId() == null || book.isAvailable()) {
        	book.setOwner(userService.getUserByUsername(getUserName()));
            booksService.addBook(book);
        	return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Edit Book not allowed !!");
    }
    
    @PostMapping("changeStatus")
    public ResponseEntity<String> changeStatus(@RequestBody Book book) {
    	Book bookObj = booksService.getBookById(book.getId());
    	booksService.updateAvailabilityStatus(book.getId(), !bookObj.isAvailable());
    	return ResponseEntity.status(HttpStatus.OK).body("Success");
    }

    public ResponseEntity<String> deleteBook(@RequestBody Book book) {
        if(book.isAvailable()) {
        	booksService.deleteBook(book.getId());
        	return ResponseEntity.noContent().build();
        }
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Delete Book not allowed !!");
    }
}
