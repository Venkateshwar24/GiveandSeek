import { Component, OnInit } from '@angular/core';
import { SocketService } from 'services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  constructor(private socketService : SocketService) {
    this.receiveMessages();
   }

  roomData = [];
  chatMessage="";
  ngOnInit(): void {


    this.getMessageData();

  }


  sendMessages()
  {
    this.socketService.chatRoomMessage(this.chatMessage);
    this.chatMessage="";
  }

 receiveMessages()
 {
   this.socketService.socket.on("chatMessages",(data)=>{
     this.roomData.push(data);
   })
 }
  getMessageData()
  {
    this.socketService.fetchChatRoomMessage().
    subscribe(res => this. roomData = res, err => console.log(err));
  }
}
