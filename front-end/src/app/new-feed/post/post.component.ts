import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  public post: IPost; 

  constructor(private myAjax: AjaxService) { }

  ngOnInit(): void {
    this.getAllPostsInit();
  }

  getAllPostsInit(){
    this.myAjax.getAllPostRequest().subscribe(data=>{
      this.post= data;
    });
  }
  
  likeAPost(post: IPost){
    this.myAjax.likeAPost(post).subscribe(data=>{
      console.log(data);
    });
  }
}
