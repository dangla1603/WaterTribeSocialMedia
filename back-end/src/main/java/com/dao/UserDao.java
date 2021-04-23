package com.dao;

import com.models.User;

import java.util.List;

public interface UserDao {

    //create
    void createUser(User newUser);

    //read
    List<User> readAllUsers();
    User readUser(int id);
    User readUser(String username);
    User readUserByUsername(String username);
    User readUserByEmail(String email);

    //update
    void updateUserContents(User user);


    //delete
    void deleteUser(User user);

}
