package com.example.BookExchange.auth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mf_user")
public class MFUser {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk_mf_user_id")
	private Integer id;
	@Column(name = "username")
	private String username;
	@Column(name = "fullname")
	private String fullname;
	@Column(name = "email")
	private String email;
	@Column(name = "phonenumber")
	private String phonenumber;
	@Column(name = "password")
	private String password;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public MFUser(Integer id) {
		super();
		this.id = id;
	}
	
	public MFUser() {
		super();
	}
}
