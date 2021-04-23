import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ChatMessageDTo } from '../models/checkmessage';
import { IUserAccount } from '../models/useraccount';
import { AjaxService } from '../services/ajax.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  constructor(public webSocketService: WebSocketService, private myAjax:AjaxService) { }

  ngOnInit(): void {
    this.userInfo();
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebsocket();
  }

  sendMessage(sendForm: NgForm){
    const chatMessageDTo =new ChatMessageDTo(this.user.username, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDTo);
    sendForm.controls.message.reset();
  }


  userInfo(){
    this.myAjax.infoRequest().subscribe(data=> {
       /* console.log(data)  */
      this.user.username = data['username'];
      console.log(this.user.username);
    })
  }
}
