import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { connection } from 'mongoose';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket = io('http://localhost:8000', {

    query: {
      id: localStorage.getItem('user_id'),
    }
  });



  user;
  user_id;
  current_room;
  constructor(private authService: AuthService,
    private http: HttpClient) {

    
  }



  newConnection(room_id) {

      this.joinRoom(room_id);


  }



 

  joinRoom(room_id) {
    this.socket.emit('joinRoom', {
      userid: localStorage.getItem('user_id'),
      chatRoomId: room_id,
    });

  }


  async chatRoomMessage(message, roomid) {
    this.socket.emit('chatMessages', {
      user_id: localStorage.getItem('user_id'),
      room_id: roomid,
      message: message

    });
  }

  receiveMessages() {
    const observable = new Observable<{ room_id: any, user_id: any, message: String, recipient_name: String }>
      (observer => {
        this.socket.on('chatMessages', (data) => {
          observer.next(data);
          console.log(data + 'on success');
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  fetchRooms() {
    return this.http.get<any>('http://localhost:8000/rooms');
  }


  fetchChatRoomMessage(roomid) {
    return this.http.get<any>(`http://localhost:8000/chatRoomMessages/${roomid}`);
  }


}

