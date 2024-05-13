package com.example.BookExchange.auth.model;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "map_role_user")
public class MapRoleUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk_map_role_user_id")
	private Integer id;
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user_id")
	private MFUser user;
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_role_id")
	private MFRole role;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public MFUser getUser() {
		return user;
	}
	public void setUser(MFUser user) {
		this.user = user;
	}
	public MFRole getRole() {
		return role;
	}
	public void setRole(MFRole role) {
		this.role = role;
	}
	
}