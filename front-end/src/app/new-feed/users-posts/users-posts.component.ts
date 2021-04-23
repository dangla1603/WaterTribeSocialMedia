import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css']
})
export class UsersPostsComponent implements OnInit {

  @Input()
  public post: IPost; 

  constructor(private myAjax: AjaxService) { }

  ngOnInit(): void {
    this.getAllPostsInit();
  }
  getAllPostsInit(){
    this.myAjax.getMyProfilePostsRequest().subscribe(data=>{
      this.post = data; // this is list of posts
    });
  }
  today = Date.now();
  fixedTimezone = this.today;
}
