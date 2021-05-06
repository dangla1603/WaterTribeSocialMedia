package com.controller;

import com.models.Post;
import com.service.PostService;
import com.models.User;
import com.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/postController")
public class PostController {
    private PostService postService;
    private UserController userController;
    private S3Service s3Service;

    @Autowired
    public PostController(PostService postService, S3Service s3Service) {
        this.postService = postService;
        this.s3Service= s3Service;
    }

    public PostController() {
    }

    @GetMapping(value="/getAllPosts")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public List<Post> getAllPosts(){
        return postService.getAllPosts();
    }

    @PutMapping(value="/likeAPost")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public void likeAPost(@RequestBody Post post, HttpSession ses){
        post.getLikes().add((User)ses.getAttribute("loggedInUser"));
        postService.updatePost(post);
        
	}

		
    @GetMapping(value="/getMyPosts")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public List<Post> getMyPosts(HttpSession session){
        User currentUser = (User) session.getAttribute("loggedInUser");
        return postService.getPostByUserID(currentUser);
    }


    /**
     * Author: Nick Haselden & Chris Bonner
     * Creates New Post
     * @param incomingPost
     * @return string
     */
    //TODO: add image mapping (@RequestBody MultipartFile file)
    @PostMapping(value="/newPost")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public void newPost(@RequestBody Post incomingPost, HttpSession session) throws IOException {

        User currentUser = (User) session.getAttribute("loggedInUser");

        //upload file to s3
//        String fileName= file.getOriginalFilename();
//        File output= new File(fileName);
//        file.transferTo(output);
//        s3Service.addImage(output);

        //setting incoming post meta data
        incomingPost.setUserID(currentUser);
//        incomingPost.setImage("https://revaturesmp.s3-us-west-2.amazonaws.com/users/"+ file.getName());

        //add post obj to DB
        postService.createPost(incomingPost);
    }

    /**
     * Author : Dang La
     * getting that specific username
     * @param id
     * @return
     * */
    @GetMapping(value="/getThatPostUser")
    @ResponseStatus(value= HttpStatus.ACCEPTED)
    public List<Post> getThatUser(@RequestParam("id") int id){
        return postService.readPostByUserId(id);
    }
}