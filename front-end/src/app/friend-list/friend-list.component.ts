import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService, IFriendList } from '../services/ajax.service';
import { Location } from '@angular/common'
import { IUserAccount } from '../models/useraccount';
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

 
  listUser : IUserAccount[];
  searchText : string;

  constructor(private router: Router, private myAjaxServ : AjaxService, private thisLo: Location) { }

  ngOnInit(): void {
    this.getAllUser();
  }


  /* 
    Back button function
    @author : Dang
  */
  backButton(){
    this.thisLo.back();
  }


  getAllUser(){
    this.myAjaxServ.getAllUser().subscribe(
      data =>{
        this.listUser = data;
      }
    )
  }
}
