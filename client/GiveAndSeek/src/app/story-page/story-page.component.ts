import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { ChatRoomsService } from 'services/chat-rooms.service';
import { SocketService } from 'services/socket.service';
import { StoryService } from 'services/story.service';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.css']
})
export class StoryPageComponent implements OnInit {
  stories = [];
  storyData: any;
  storyIdfromRoute: string;
  chatRoom: FormGroup;
  rooms = [];
  room_id;
  loadComponent: boolean = false;
  constructor(private route: ActivatedRoute,
    private storyService: StoryService,
    public authService: AuthService,
    private chatRoomService: ChatRoomsService,
    private fb: FormBuilder,
    private _route: Router) {



    this.chatRoom = this.fb.group({
      story_id: '',
      recipient_id: ''
    })
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.storyIdfromRoute = routeParams.get('s_id');
    this.storyService.getStories().toPromise().then(res => this.stories = res)
      .then(stories => this.storyData = stories.filter(sto => sto._id === this.storyIdfromRoute));
    if (this.authService.isLoggedIn())
      this.authService.getUser();

  }







  async communicate() {
    let room;
    await this.storyService.fetchRooms().subscribe(res => {
      this.rooms = res;
      console.log(this.rooms);
      room = this.rooms.find(room => room.story_id == this.storyIdfromRoute);
      this.room_id = room._id;
      this._route.navigate(['/chatroom', this.room_id]);

      this.loadComponent = true;
    });

  }


  onRoomCreate(story_id, user_id) {

    this.chatRoom.get('story_id').setValue(story_id);
    this.chatRoom.get('recipient_id').setValue(user_id);

    this.chatRoomService.createRoom(this.chatRoom.value)
      .subscribe(res => console.log(res), err => console.log(err));
  }

}
