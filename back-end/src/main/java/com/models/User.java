package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int userID;

    @Column(name="username", unique = true, nullable = false)
    private String username;

    @Column(name="first_name", unique = false, nullable = false)
    private String firstName;

    @Column(name="last_name", unique = false, nullable = false)
    private String lastName;

    @Column(name="password", unique = false, nullable = false)
    private String password;

    @Column(name="email", unique = true, nullable = false)
    private String email;

    @Column(name="profile_img", unique = false, nullable = true)
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy ="myPublisher", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private  List<Post> myPosts;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String firstName, String lastName,
                String email, String image) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.image= image;
    }

    public User(String username, String firstName, String lastName,
                String email) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public User(int userID, String username, String firstName, String lastName, String password,
                String email, String image, List<Post> myPosts) {
        this.userID = userID;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.image= image;
        this.myPosts = myPosts;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Post> getMyPosts() {
        return myPosts;
    }

    public void setMyPosts(List<Post> myPosts) {
        this.myPosts = myPosts;
    }

    @Override
    public String toString() {
        return "\nUser{" +
                "userID=" + userID +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
