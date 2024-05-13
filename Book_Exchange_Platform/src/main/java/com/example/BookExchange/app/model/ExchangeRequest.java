package com.example.BookExchange.app.model;

import java.util.Date;

import com.example.BookExchange.auth.model.MFUser;

import jakarta.persistence.*;

@Entity
@Table(name = "exchange_requests")
public class ExchangeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "requested_book_id", nullable = false)
    private Book requestedBook;
    
    @ManyToOne
    @JoinColumn(name = "exchange_book_id", nullable = true)
    private Book exchangedBook;

	@ManyToOne
    @JoinColumn(name = "requesting_user_id", nullable = false)
    private MFUser requestingUser;
	
	@ManyToOne
    @JoinColumn(name = "owner_user_id", nullable = true)
    private MFUser ownerUser;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Date createdAt;
    
    @Column(nullable = false)
    private Date updatedAt;
    
    @Column(nullable = false)
    private String transaction_type;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the requestedBook
	 */
	public Book getRequestedBook() {
		return requestedBook;
	}

	/**
	 * @param requestedBook the requestedBook to set
	 */
	public void setRequestedBook(Book requestedBook) {
		this.requestedBook = requestedBook;
	}
	
	/**
	 * @return the exchangedBook
	 */
	public Book getExchangedBook() {
		return exchangedBook;
	}

	/**
	 * @param exchangedBook the exchangedBook to set
	 */
	public void setExchangedBook(Book exchangedBook) {
		this.exchangedBook = exchangedBook;
	}

	/**
	 * @return the requestingUser
	 */
	public MFUser getRequestingUser() {
		return requestingUser;
	}

	/**
	 * @param requestingUser the requestingUser to set
	 */
	public void setRequestingUser(MFUser requestingUser) {
		this.requestingUser = requestingUser;
	}

	/**
	 * @return the ownerUser
	 */
	public MFUser getOwnerUser() {
		return ownerUser;
	}

	/**
	 * @param ownerUser the ownerUser to set
	 */
	public void setOwnerUser(MFUser ownerUser) {
		this.ownerUser = ownerUser;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the createdAt
	 */
	public Date getCreatedAt() {
		return createdAt;
	}

	/**
	 * @param createdAt the createdAt to set
	 */
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	/**
	 * @return the updatedAt
	 */
	public Date getUpdatedAt() {
		return updatedAt;
	}

	/**
	 * @param updatedAt the updatedAt to set
	 */
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	/**
	 * @return the transaction_type
	 */
	public String getTransaction_type() {
		return transaction_type;
	}

	/**
	 * @param transaction_type the transaction_type to set
	 */
	public void setTransaction_type(String transaction_type) {
		this.transaction_type = transaction_type;
	}
	
	public ExchangeRequest() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    
}