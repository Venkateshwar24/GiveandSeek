import { AfterContentChecked, AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { SocketService } from 'services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  roomData = [];
  chatMessage = "";
  roomIdfromRoute;
  USERID;
  constructor(private socketService: SocketService,
    private route: ActivatedRoute,
    public authService: AuthService) {
      
    this.socketService.receiveMessages().subscribe(data =>
      this.roomData.push(data));

  }


  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.roomIdfromRoute = routeParams.get('s_id');
    this.socketService.newConnection(this.roomIdfromRoute);
    this.getMessageData(this.roomIdfromRoute);
    this.USERID = localStorage.getItem('user_id');


  }




  sendMessages() {
    this.socketService.chatRoomMessage(this.chatMessage, this.roomIdfromRoute);
    this.chatMessage = "";


  }



  getMessageData(roomIdfromRoute) {
    this.socketService.fetchChatRoomMessage(roomIdfromRoute).
      subscribe(res => this.roomData = res, err => console.log(err));
  }
}
