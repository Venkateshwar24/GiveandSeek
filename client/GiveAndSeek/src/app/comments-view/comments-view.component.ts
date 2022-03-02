import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { StoryService } from 'services/story.service';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css']
})
export class CommentsViewComponent implements OnInit {
@Input() story_id ="";
user: Object;
comments = [];
  constructor( public authService : AuthService,
    private http : HttpClient,
    private fb : FormBuilder,
    private storyService : StoryService,
    private _route : Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserId();
    }
    this.getReviews();
  }

  getUserId() {
    const token = this.authService.getToken();
    this.http.get(`http://localhost:8000/users/${token}`)
      .subscribe(
        res => this.user = res);
  }

  CommentData = this.fb.group({
    user_id: [''],
    user_name:[''],
    story_id: [''],
    user_comment: ['']
  })

  onCommentSubmit(user_id: any, user_name:any) {
    this.CommentData.get('user_id').setValue(user_id);
    this.CommentData.get('user_name').setValue(user_name);
    this.CommentData.get('story_id').setValue(this.story_id);
    this.storyService.postComments(this.CommentData.value, this.story_id)
      .subscribe(res => {
        console.log(res)
        alert("Comment Successful")
      },
        err => console.log(err)
      );
    window.location.reload();
    this._route.navigate([`/stories/${this.story_id}`]);
  }
  


  getReviews() {
    this.storyService.getComments(this.story_id)
      .subscribe(
        res => this.comments = res,
        err => console.log(err)
      );

  }

}
