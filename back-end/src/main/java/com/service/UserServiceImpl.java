package com.service;

import com.dao.UserDao;
import com.models.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService{

    private SessionFactory sesFactory;
    private UserDao userDao;

    @Autowired
    public UserServiceImpl(SessionFactory sesFactory, UserDao userRepo) {
        this.sesFactory = sesFactory;
        this.userDao = userRepo;
    }

    public UserServiceImpl() {
    }

    public SessionFactory getSesFactory() {
        return sesFactory;
    }

    @Autowired
    public void setSesFactory(SessionFactory sesFactory) {
        this.sesFactory = sesFactory;
    }

    /**
     * Creates new user in DB, pass in all user info except ID
     * @param newUser All info except ID, that's generated in the DB.
     */
    @Override
    public void createUser(User newUser) {
        userDao.createUser(newUser);
    }

    /**
     * Returns all users as a list
     * @return all users
     */
    @Override
    public List<User> readAllUsers() {
        return userDao.readAllUsers();
    }

    /**
     * Returns a specific user chosen by ID
     * @param id target user's ID
     * @return the user with the matching ID
     */
    @Override
    public User readUser(int id) {
        return userDao.readUser(id);
    }

    /**
     * Returns user with that name. If none found, returns null. Prints out if no user found
     * @param username Username to be found
     * @return 1st user by that name (should be unique), or null if none found.
     */
    @Override
    public User readUser(User username) {
        User returnUser= userDao.readUser(username.getUsername());
        if(returnUser.getPassword().equals(username.getPassword())){
            return returnUser;
        }
        return null;
    }

    @Override
    public User readUserByUsername(String username) {
        return userDao.readUserByUsername(username);
    }

    /**
     *
     * @param email users email
     * @return  user object
     */
    @Override
    public User readUserByEmail(String email) {
        return userDao.readUserByEmail(email);
    }


    /**
     * Replaces old user data in the DB with new user data given as input. Id should never change!
     * @param user The new data
     */
    @Override
    public void updateUserContents(User user) {
        User userID= readUserByUsername(user.getUsername());
        user.setUserID(userID.getUserID());
        user.setPassword(userID.getPassword());
        userDao.updateUserContents(user);
    }

    /**
     * Replaces old user data in the DB with new user data given as input. Id should never change!
     * @param user The new data
     */
    @Override
    public void updateUser(User user) {
        User userID= readUserByUsername(user.getUsername());
        user.setUserID(userID.getUserID());
        user.setPassword(userID.getPassword());
        user.setImage(userID.getImage());
        userDao.updateUserContents(user);
    }

    /**
     * Author: Nick Haselden
     *
     * Replaces old user password in the DB with new password that was given as input.
     *
     * @param user the user whose password is changing
     */
    @Override
    public void updateUserPassword(User user){
        userDao.updateUserContents(user);
    }

    /**
     * Deletes chosen user
     * @param user Full user object
     */
    @Override
    public void deleteUser(User user) {
        userDao.deleteUser(user);
    }
}
