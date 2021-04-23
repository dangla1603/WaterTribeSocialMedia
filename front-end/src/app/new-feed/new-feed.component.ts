import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../models/post';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent implements OnInit {
  @Input()
  public posts: IPost[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}