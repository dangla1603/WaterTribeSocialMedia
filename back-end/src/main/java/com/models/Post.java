package com.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name= "Posts")
public class Post {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name= "post_id")
    private int postID;

    @ManyToOne(fetch =FetchType.EAGER)
    @JoinColumn(name= "user_id", nullable = false)
    private User myPublisher;

    @Column(name= "body", unique = false, nullable = false)
    private String body;

    @Column(name= "image", unique = false, nullable = true)
    private String image;

    @ManyToMany(fetch= FetchType.EAGER)
    @Column(name= "likes", unique = false, nullable = false)
    private List<User> likes;


    public Post() {
    }

    public Post(int postID, User myPublisher, String body, String image, List<User> likes) {
        this.postID = postID;
        this.myPublisher = myPublisher;
        this.body = body;
        this.image = image;
        this.likes = likes;
    }

    public Post(User myPublisher, String body, String image, List<User> likes) {
        this.myPublisher = myPublisher;
        this.body = body;
        this.image = image;
        this.likes = likes;
    }

    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public User getUserID() {
        return myPublisher;
    }

    public void setUserID(User myPublisher) {
        this.myPublisher = myPublisher;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<User> getLikes() {
        return likes;
    }

    public void setLikes(List<User> likes) {
        this.likes = likes;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postID=" + postID +
                ", myPublisher=" + myPublisher.getUsername() +
                ", body='" + body + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
