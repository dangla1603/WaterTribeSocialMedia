import { Injectable } from '@angular/core';
import { ChatMessageDTo } from '../models/checkmessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  websocket: WebSocket;
  chatMessage: ChatMessageDTo[] = [];

  constructor() { }

  public openWebSocket(){
    this.websocket = new WebSocket('ws://localhost:8080/api/chat');

    this.websocket.onopen = (event) =>{
      console.log('Open: ', event);
    };

    this.websocket.onmessage = (event) =>{
      const ChatMessageDTo = JSON.parse(event.data);
      this.chatMessage.push(ChatMessageDTo);
    };

    this.websocket.onclose = (event)  =>{
      console.log('close: ', event);
    };
  }

  public sendMessage(ChatMessageDTo: ChatMessageDTo){
    this.websocket.send(JSON.stringify(ChatMessageDTo));
  }
  
  public closeWebsocket(){
    this.websocket.close();
  }
}
