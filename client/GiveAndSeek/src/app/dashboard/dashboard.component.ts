import { Component, OnInit } from '@angular/core';
import { StoryService } from 'services/story.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 stories = [];
  constructor(private storyService:StoryService) { }

  ngOnInit(): void {
    this.fetchStories();
  }


  fetchStories()
  {
    this.storyService.getStories()
      .subscribe(
        res => this.stories = res,
        err => console.log(err)
      );
  }

}
