import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {

  constructor(private http : HttpClient) { }
private roomURL = "http://localhost:8000/rooms";


  createRoom(roomDetails)
  {
    return this.http.post<any>(this.roomURL,roomDetails);
  }
}
