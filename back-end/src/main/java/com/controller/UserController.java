package com.controller;

import com.models.User;
import com.service.EmailService;
import com.service.S3Service;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/userController")
public class UserController {

    private UserService userService;
    private S3Service s3Service;
    private PasswordEncoder passwordEncoder;
    static String encodeUri;
    static String nonBuggyUri;

    public UserController(){
    }

    //constructor autowired
    @Autowired
    public UserController(UserService userService, S3Service s3Service, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.s3Service= s3Service;
        this.passwordEncoder= passwordEncoder;
    }


    @GetMapping(value="/getAllUsers")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public List<User> getAllUsers(){
        return userService.readAllUsers();
    }

    /**
     * Author : Dang La
     * getting that specific username
     * @param username
     * @return
     * */
    @GetMapping(value="/getThatUser")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public User getThatUser(@RequestParam("username") String username){
       return userService.readUserByUsername(username);
    }

    /**
     * Author : Nick Haselden
     *
     * getting the user associated with the specific email address. Sends that email address
     * a URL that redirects them to a page where they can input a new password
     *
     * @param email
     * @return the user whose email matches our param
     */
    @GetMapping(value="/getEmail")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public User getUserByEmail(@RequestParam("email") String email, HttpSession session){
        User foundUser = userService.readUserByEmail(email);
        encodeUri = passwordEncoder.encode("new-password");
        /*
            slashes break URI's so im replacing all slashes that appear
            in the newly encoded URI with a period to avoid that.
         */
        nonBuggyUri = encodeUri.replaceAll("/", ".");

        session.setAttribute("changePassword", foundUser);

        User currentFoundUser = (User) session.getAttribute("changePassword");

        //provides the classpath of the applicationContext.xml file
        ApplicationContext context = new FileSystemXmlApplicationContext(System.getenv("APP_CTX_CLASSPATH"));

        //Get the mailer instance
        EmailService mailer = (EmailService) context.getBean("emailService");
        //Sends an email
        mailer.sendMail(
                currentFoundUser.getEmail(),
                "Water Tribe: password reset request",
                "Hey there! \n"+
                        "Please go to the following URL to create a new password: \n"+
                        "http://localhost:4200/new-password/"+nonBuggyUri
        );

        return currentFoundUser;
    }

    @GetMapping(value="/getEncodedUri")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public String getEncodeUri(){
        return nonBuggyUri;
    }

    /**
     * Author: Nick Haselden
     *
     * updates the user's password who just input their email.
     *
     * @param newPassword
     * @param session
     */
    @PutMapping(value="/resetPassword")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public void resetPassword( @RequestBody String newPassword, HttpSession session){

        User user = (User) session.getAttribute("changePassword");
        String encryptedPassword = passwordEncoder.encode(newPassword);

        user.setPassword(encryptedPassword);
        userService.updateUserPassword(user);
        session.setAttribute("changePassword", null);
    }


    /**
     * Author: Dang La
     * getting username
     * @param session
     * @return the user information
     * */
    @GetMapping(value="/getName")
    public User getLoggedInName(HttpSession session){
        User currentUser = (User) session.getAttribute("loggedInUser");
        return currentUser;
    }


    /**
     * Author: Dang La
     * Log-in
     * @param session, currentUser
     * @return currentUser
     * */
    @PostMapping(value="/login")
    public User login(HttpSession session, @RequestBody User userInfo){

        /*
        since the password is now encrypted the new user must be retrieved by
        its username instead of by a dummy user object, as it was pre pw hashing.
        */
        User newUser= userService.readUserByUsername(userInfo.getUsername());

        //check if the PW input on client side matches the encrypted PW in our DB
        if(passwordEncoder.matches(userInfo.getPassword(),newUser.getPassword())){
            //same login logic as before password encryption
            session.setAttribute("loggedInUser", newUser);

            User currentUser = (User) session.getAttribute("loggedInUser");

            return newUser;

        }else return new User("", "", "", "", "");

    }

    /**
     * Author: Dang La
     * Log-out
     * @param myReq
     * @return  null when logged out
     * */
    @GetMapping(value="/logout")
    public void logout(HttpServletRequest myReq){
        HttpSession session = myReq.getSession();
        session.invalidate();
    }

    /**
     * Author: Nick Haselden
     * Creates New User
     * @param incomingUser
     * @return string
     */
    @PostMapping(value="/newUser")
    public void newUser(@RequestBody User incomingUser){
        incomingUser.setImage("https://revaturesmp.s3-us-west-2.amazonaws.com/users/298-512.png");
        userService.createUser(incomingUser);

    }

    /**
     * Author: Chris Bonner
     * updates user
     * @param user user object to be updated
     */
    @PutMapping(value="/updateUser")
    public void updateUser(@RequestBody User user){
        userService.updateUser(user);
    }


    /**
     * Author: Chris Bonner
     *
     * adds uploaded image as profile picture for current user
     * @param file image file
     * @throws IOException
     */
    //TODO: cors issue on front end, works in postman
    @PostMapping(value="/uploadImg")
    public void uploadImage(@RequestBody MultipartFile file, HttpSession currentUser) throws IOException {
        User user= (User)currentUser.getAttribute("loggedInUser");
        user.setImage("https://revaturesmp.s3-us-west-2.amazonaws.com/users/"+ file.getOriginalFilename());
        userService.updateUserContents(user);

        String fileName= file.getOriginalFilename();
        File output= new File(fileName);
        file.transferTo(output);

        s3Service.addImage(output);
    }
}
