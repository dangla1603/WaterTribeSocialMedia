import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  newUser, RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  myNewUser: newUser = {
    'username': '',
    'firstName': '',
    'lastName': '',
    'password': '',
    'email': ''
  }

  constructor(private route: ActivatedRoute, private myAjax: RegistrationService) { }

  ngOnInit(): void {
  }

  registerButton(){
    this.myAjax.createUser(this.myNewUser).subscribe(data=>{
    });
  }
}
