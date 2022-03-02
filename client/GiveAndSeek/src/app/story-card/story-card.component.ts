import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent implements OnInit {
  @Input() storyData = [];
  constructor() { }

  ngOnInit(): void {
  }

}
