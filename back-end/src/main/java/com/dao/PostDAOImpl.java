package com.dao;

import com.models.Post;
import com.models.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository("postRepo")
public class PostDAOImpl implements PostDAO {

    private SessionFactory sesFactory;

    public PostDAOImpl() {
    }

    public PostDAOImpl(SessionFactory sesFactory) {
        this.sesFactory = sesFactory;
    }

    public SessionFactory getSesFactory() {
        return sesFactory;
    }

    @Autowired
    public void setSesFactory(SessionFactory sesFactory) {
        this.sesFactory = sesFactory;
    }


    @Override
    public void createPost(Post post){
        sesFactory.getCurrentSession().save(post);
    }

    @Override
    public List<Post> getAllPosts(){
        return sesFactory.getCurrentSession().createQuery("from Post order by post_id desc ", Post.class).list();
    }

    @Override
    public List<Post> getPostByUserID(User user) {
        System.out.println("user id is" + user.getUserID());
        String HQL = "FROM Post P Where P.myPublisher = " + user.getUserID() ;
        return sesFactory.getCurrentSession().createQuery(HQL, Post.class).list();
    }


    @Override
    public void updatePost(Post post) {
        Session ses= sesFactory.openSession();
        Transaction tx= ses.beginTransaction();

        ses.update(post);
        tx.commit();
        ses.close();
    }

    @Override
    public void deletePost(Post post) {
        Session ses= sesFactory.openSession();
        Transaction tx= ses.beginTransaction();

        ses.delete(post);
        tx.commit();
        ses.close();
    }

    @Override
    public List<Post> readPostByUserId(int userId) {
        String HQL = "FROM Post P Where P.myPublisher = " + userId ;
        return sesFactory.getCurrentSession().createQuery(HQL, Post.class).list();
    }


}
