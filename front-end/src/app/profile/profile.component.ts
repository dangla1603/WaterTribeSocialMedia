import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser = '';

  // Display all post in new-feed 
  public newsFeedPosts: IPost[] = [];

  profileName: string ='user';

  constructor(private myAjax: AjaxService, private router: ActivatedRoute) {}
  
  allPosts: IPost= {
    'body':'',
    'image':'',
    'username': '',
    'fname':'',
    'lname':'',
    'likes':[],
    'userID':{}
  };
  
  ngOnInit(): void {
    this.getAllPostsInit();
      this.profileName = this.router.snapshot.paramMap.get('username');
  }

  getAllPostsInit(){
    this.myAjax.getAllPostRequest().subscribe(data=>{
      this.allPosts= data;
    });
  }

  logOutButton(){
    this.myAjax.logoutRequest().subscribe(data =>
      {
        const ourField = 'message';
        this.currentUser = this.currentUser + '' +data[ourField];
      }
    );
  }
}