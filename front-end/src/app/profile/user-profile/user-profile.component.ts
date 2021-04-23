import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAccount } from 'src/app/models/useraccount';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }
  constructor(private HttpClie: HttpClient,private myAjax: AjaxService,private router: Router) { }

  ngOnInit(): void {
    this.userInfo();
  }


  userInfo(){
    this.myAjax.infoRequest().subscribe(data=> {
       /* console.log(data)  */
      this.user.username = data['username'];
      this.user.firstName = data['firstName'];
      this.user.lastName = data['lastName'];
      this.user.image= data['image'];
    })
  }
}
