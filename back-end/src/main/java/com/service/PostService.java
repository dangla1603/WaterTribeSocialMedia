package com.service;

import com.models.Post;
import com.models.User;

import java.util.List;

public interface PostService {
    public void createPost(Post post);
    public List<Post> getAllPosts();
    public List<Post> getPostByUserID(User user);
    public void updatePost(Post post);
    public void deletePost(Post post);

    List<Post> readPostByUserId (int userId);
}

