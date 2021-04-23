import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAccount } from '../models/useraccount';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  //OUR SIGNATURE SYMBOL
  myImage: string = "assets/water-removebg-preview.png";
   public currentUser: IUserAccount= {
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  } ;
  constructor(private router: Router, private myAjax: AjaxService) { }

  ngOnInit(): void {

    /* 
      HARD-CODE preveting back button after log-out
    */
    let currentUrl = window.location.href;
    let tmpVar = currentUrl.includes('/login');
    if (currentUrl.includes('/login')) {
      window.onpopstate = function (event) {
        history.go(1);
      }
    }
}

  // Log in function 
  loginButton(event){
      event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#inputUserName').value;
    const password = target.querySelector('#inputPassword').value; 
     this.myAjax.testLogin(username,password).subscribe(
      data =>{
        console.log(data);
        this.currentUser.username= data['username'];
        this.currentUser.firstName= data['firstName'];
        this.currentUser.lastName= data['lastName'];
        this.currentUser.email= data['email'];

        if(this.currentUser.username!= ""){
          window.location.replace('/main-page');
        } else{
          alert("Invalid Credentials")
        }  
      })

     /*  this.myAjax.loginRequest().subscribe(
      data =>{
        console.log(data)         // print user info

      }
    );  */
  }
    
   // Log out function
  logoutButton(){
     console.log("click log out");
     this.myAjax.logoutRequest().subscribe(
      data =>{
        const ourField = 'message';
      }
    );
  } 
}
