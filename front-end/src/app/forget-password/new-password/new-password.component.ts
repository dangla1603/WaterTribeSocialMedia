import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAccount } from 'src/app/models/useraccount';
import { AjaxService } from 'src/app/services/ajax.service';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  confirmPassword: string = "";
  notMatchingMessage: string = "";
  uri: string = "";
  checkPWsMatch: boolean = true;

  constructor(private myAjax: AjaxService, private router:Router ) { }

  ngOnInit(): void {
    this.getEncodedUri();
  }

  resetPasswordButton(){
    console.log(this.user.password);
    if(this.confirmPassword != this.user.password){
      this.notMatchingMessage="both input fields must match"
    }else{
      this.myAjax.resetPassword(this.user.password).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/login']);
      })
    }
  }

  getEncodedUri(){
    this.myAjax.setNewPasswordUri().subscribe(data=>{
      console.log(data);
    })
  }
}