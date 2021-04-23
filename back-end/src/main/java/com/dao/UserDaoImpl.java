package com.dao;

import com.models.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;


import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository("userRepo")
public class UserDaoImpl implements UserDao{

    private SessionFactory sesFactory;
    public UserDaoImpl(){}
    public UserDaoImpl(SessionFactory sesFactory){this.sesFactory= sesFactory;}
    public SessionFactory getSesFactory(){return sesFactory;}

    @Autowired
    public void setSesFactory(SessionFactory sesFactory){this.sesFactory= sesFactory;}


    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * Creates new user in DB, pass in all user info except ID
     * @param newUser All info except ID, that's generated in the DB.
     */
    @Override
    public void createUser(User newUser) {
        String encryptedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encryptedPassword);
        sesFactory.getCurrentSession().save(newUser);
    }

    /**
     * Returns all users as a list
     * @return all users
     */
    @Override
    public List<User> readAllUsers() {
        return sesFactory.getCurrentSession().createQuery("from User", User.class).list();
    }

    /**
     * Returns a specific user chosen by ID
     * @param id target user's ID
     * @return the user with the matching ID
     */
    @Override
    public User readUser(int id) {
        return null;
    }

    /**
     * Returns user with that name. If none found, returns null. Prints out if no user found
     * @param username Username to be found
     * @return 1st user by that name (should be unique), or null if none found.
     */
    @Override
    public User readUser(String username) {

        List<User> user= sesFactory.getCurrentSession().createQuery("from User where username= '"+
                username+ "'", User.class).list();
        return user.get(0);
    }

    /**
     * Returns user with that name. If none found, returns null. Prints out if no user found
     * @param username Username to be found
     * @return username
     */
    @Override
    public User readUserByUsername(String username) {
        List<User> user= sesFactory.getCurrentSession().createQuery("from User where username= '"+ username +"'").list();
        return user.get(0);
    }

    /**
     * Returns user with that email. If none found, returns null. Prints out if no user found
     * @param email
     * @return user with the specified email address
     */
    @Override
    public User readUserByEmail(String email){
        List<User> user= sesFactory.getCurrentSession().createQuery("from User where email= '"+ email +"'").list();
        return user.get(0);
    }

    /**
     * Replaces old user data in the DB with new user data given as input. Id should never change!
     * @param user The new data
     */
    @Override
    public void updateUserContents(User user) {
        sesFactory.getCurrentSession().update(user);
    }

    /**
     * Deletes chosen user
     * @param user Full user object
     */
    @Override
    public void deleteUser(User user) {
    }
}
