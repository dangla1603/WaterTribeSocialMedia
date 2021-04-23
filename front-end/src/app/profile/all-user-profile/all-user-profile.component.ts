import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/models/post';
import { IUserAccount } from 'src/app/models/useraccount';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-all-user-profile',
  templateUrl: './all-user-profile.component.html',
  styleUrls: ['./all-user-profile.component.css']
})
export class AllUserProfileComponent implements OnInit {

  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  thisPost: IPost ={
    'username': '',
    'fname': '',
    'lname': '',
    'body': '',
    'image': '',
    'likes':[],
    'userID': {},
}
  
  testPost: IPost;
  username: string = 'username';
  firstName: string = 'firstName';
  lastName: string = 'lastName'
  userID : number;

  constructor(private thisRouter: ActivatedRoute, private myAjaxServ : AjaxService) {
    
   }

  ngOnInit(): void {
     this.username = this.thisRouter.snapshot.paramMap.get('username');
     this.firstName = this.thisRouter.snapshot.paramMap.get('firstName');
     this.lastName = this.thisRouter.snapshot.paramMap.get('lastName');
     this.clickSeachButton();
  }


 
  getAllUser(){
    this.myAjaxServ.getAllUser().subscribe( data =>{});
  }

  clickSeachButton(){
    this.myAjaxServ.userInfoRequest(this.username).subscribe(
      data =>{
        this.user.username = data['username'];
        this.user.firstName = data['firstName'];
        this.user.lastName = data['lastName'];
        this.user.userID = data['userID'];
        this.user.image= data['image'];

        this.myAjaxServ.getUserPost(this.user.userID).subscribe(
          data =>{this.testPost = data;});
      }
    );
  } 

   /* Log out Function*/
   logOutButton(){
    this.myAjaxServ.logoutRequest().subscribe(data =>{});
  }
}