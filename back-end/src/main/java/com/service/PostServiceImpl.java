package com.service;

import com.dao.PostDAO;
import com.models.Post;
import com.models.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("postService")
public class PostServiceImpl implements PostService {
    private SessionFactory sesFactory;

    PostServiceImpl(){}

    @Autowired
    public PostServiceImpl(SessionFactory sesFactory, PostDAO postDAO) {
        this.sesFactory = sesFactory;
        this.postDAO = postDAO;
    }

    PostDAO postDAO;
    /**@param post new post object being created
     *
     */
    @Override
    public void createPost(Post post) {

        postDAO.createPost(post);
    }

    /**@return array list of post objects
     */
    @Override
    public List<Post> getAllPosts() {
        return postDAO.getAllPosts();
    }

    /**@param user  The user id
     * @return list of post objects
     */
    @Override
    public List<Post> getPostByUserID(User user) {

        return postDAO.getPostByUserID(user);
    }
    

    /**@param post updated post object
     *
     */
    @Override
    public void updatePost(Post post) {
        postDAO.updatePost(post);
    }

    /**@param post post object to be deleted
     *
     */
    @Override
    public void deletePost(Post post) {
        postDAO.deletePost(post);
    }

    @Override
    public List<Post> readPostByUserId(int userId) {
        return postDAO.readPostByUserId(userId);
    }


}



