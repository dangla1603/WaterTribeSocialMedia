import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { IUpdateAccount} from '../models/updateaccount';
import { Location } from '@angular/common'
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {
  constructor(private myAjax: AjaxService, private thisLo: Location) { }

  currentUser: IUpdateAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
  }

  ngOnInit(): void {
    this.userInfo();
  }

  formSubmit(event){
    const target= event.target;
    const fname= target.querySelector('#fname').value;
    const lname= target.querySelector('#lname').value;
    const email= target.querySelector('#email').value;

    let user: IUpdateAccount= {
      'email': email,
      'firstName': fname,
      'lastName':lname,
      'username':this.currentUser.username
    }
    this.myAjax.updateUserInfo(user).subscribe(
      data=>{}
    );

    location.reload();
    window.location.replace("/profile/"+ user.username);
  }

  userInfo(){
    this.myAjax.infoRequest().subscribe(data=> {
      this.currentUser.username = data['username'];
    })
  }

  backButton(){
    this.thisLo.back();
  }

  imageUploadButton(event){
    event.preventDefault();
    console.log("starting upload")
    const target= event.target;
    const image= target.querySelector('#postImage').value;
    console.log(image)
    console.log(this.currentUser)

    this.myAjax.uploadProfileImg(image).subscribe(data =>{});
  }
}
