import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAccount } from '../models/useraccount';
import { AjaxService } from '../services/ajax.service';




@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  emailSentMessage: string = "";

  constructor(private router:Router, private myHttpCli: HttpClient, private myAjax: AjaxService) { }

  ngOnInit(): void {
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  forgetPasswordButton(){
    this.emailSentMessage = "An email is now being sent";
    this.myAjax.retrieveEmail(this.user.email).subscribe(data=>{
    })
  }
}
