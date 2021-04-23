import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../models/post';
import { IUserAccount } from '../models/useraccount';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  newPost: IPost= {
    'username': '',
    'fname': '',
    'lname': '',
    'body':  '',
    'image': '',
    'likes': [],
    'userID': {}//this.user
  }

  image: File;

  listUser : IUserAccount[];

  seachUser: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  userSearch: string;

  loading = false;

  constructor(private HttpClie: HttpClient,private myAjax: AjaxService,private router: Router,) {
    
   }
  
  currentUser = '';
  
  ngOnInit(): void {
    this.userInfo();
  }
  title = "myPage";

  logOutButton(){
    this.myAjax.logoutRequest().subscribe(data =>{});
  }
  
  userInfo(){
    this.myAjax.infoRequest().subscribe(data=> {
      this.user.username = data['username'];
      this.user.firstName = data['firstName'];
      this.user.lastName = data['lastName'];
      this.user.image= data['image'];
    })
  }
   clickSeachButton(){
    
    this.myAjax.userInfoRequest(this.userSearch).subscribe(
      data =>{
        this.seachUser.username = data['username'];
        console.log(this.userSearch);
    });
  } 
  
  shareButton(){
    this.myAjax.createPost(this.newPost).subscribe(data=>{})
    location.reload();
  }
}
