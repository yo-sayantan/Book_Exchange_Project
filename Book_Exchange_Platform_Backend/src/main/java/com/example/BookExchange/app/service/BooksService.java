package com.example.BookExchange.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.BookExchange.app.model.Book;
import com.example.BookExchange.app.repo.BooksRepository;
import java.util.List;

@Service
public class BooksService {

	@Autowired
    private BooksRepository booksRepository;

    public List<Book> getAllBooks() {
        return removeSensitiveData(booksRepository.findAll());
    }
    
    /**
     * Retrieves all books listed.
     *
     * @return A list of all books.
     */
    public List<Book> getAllListedBooks() {
        return removeSensitiveData(booksRepository.findAll());
    }
    
    /**
     * Retrieves all books listed for exchange or lending.
     *
     * @return A list of all books.
     */
    public List<Book> getAllAvailableBooks(Integer id) {
        return removeSensitiveData(booksRepository.findAvailableBooks(true, id));
    }
    
    /**
     * Retrieves all books listed by a user for exchange or lending.
     *
     * @return A list of all books.
     */
    public List<Book> getAllBooksForAUser(Integer id) {
        return removeSensitiveData(booksRepository.findBooksUploadedByUser(id));
    }

    /**
     * Retrieves a book by its ID.
     *
     * @param id The ID of the book.
     * @return The book with the given ID, or null if not found.
     */
    public Book getBookById(Integer id) {
        return booksRepository.findById(id).orElse(null);
    }
    
    /**
     * Updates the availability status of a book.
     *
     * @param id The ID of the book.
     * @param available The new availability status.
     * @return The updated book.
     */
    public Book updateAvailabilityStatus(Integer id, boolean available) {
        Book book = booksRepository.findById(id).orElse(null);
        if (book!= null) {
            book.setAvailable(available);
            return booksRepository.save(book);
        }
        return null;
    }

    /**
     * Adds a new book listing.
     *
     * @param book The book to be listed.
     * @return The saved book.
     */
    public Book addBook(Book book) {
    	book.setAvailable(true);
        return booksRepository.save(book);
    }

    /**
     * Update an old book listing.
     *
     * @param book The book to be listed.
     * @return The saved book.
     */
    public Book updateBook(Book book) {
        return booksRepository.save(book);
    }

    /**
     * Delete a book listing.
     *
     * @param book The book to be listed.
     * @return The saved book.
     */
    public void deleteBook(Integer id) {
        booksRepository.deleteById(id);
    }
    
    private List<Book> removeSensitiveData(List<Book> books) {
		for(Book book : books) {
			book.getOwner().setId(null);
			book.getOwner().setPassword(null);
			book.getOwner().setPhonenumber(null);
		}
    	
    	return books;
    }
}