package com.service;

import com.models.User;

import java.util.List;

public interface UserService {
    //create
    void createUser(User newUser);

    //read
    List<User> readAllUsers();
    User readUser(int id);
    User readUser(User username);
    User readUserByUsername(String username);
    User readUserByEmail(String email);

    //update
    void updateUserContents(User user);
    void updateUser(User user);
    void updateUserPassword(User user);

    //delete
    void deleteUser(User user);
}
