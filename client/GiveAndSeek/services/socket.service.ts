import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import io from 'socket.io-client';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket:any;
  user;
  user_id;
  current_room;
  constructor(private authService: AuthService,
    private http: HttpClient) { }

  async communication(room_id) {
    this.current_room = room_id;
    if (this.authService.isLoggedIn()) {
      this.socket = await io('http://localhost:8000', {
        query:{
          id:this.authService.loggedIn_user_id,
        }
      });
      this.joinRoom(room_id);



    }
  }


  joinRoom(room_id){
    this.socket.emit('joinRoom',{
      userid:this.authService.loggedIn_user_id,
      chatRoomId:room_id,
    });
    
  }


  chatRoomMessage(message){
    this.socket.emit('chatMessages',{
      user_id:this.authService.loggedIn_user_id,
      room_id:this.current_room,
      message:message
    });  
    
  }


  fetchRooms()
  {
    return this.http.get<any>('http://localhost:8000/rooms');
  }


  fetchChatRoomMessage()
  {
    return this.http.get<any>(`http://localhost:8000/chatRoomMessages/${this.current_room}`);
  }
}
