import { Component, Input, OnInit } from '@angular/core';
import { StoryService } from 'services/story.service';

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.css']
})
export class UpdateViewComponent implements OnInit {
@Input() updateDetails = [];
@Input() story_id = "";
updateData={
  update_title:"",
  update_description:""
};

  constructor(private storyService : StoryService) { }

  ngOnInit(): void {
  }

  onUpdateSubmit()
  {

    this.storyService.patchUpdateStories(this.updateData, this.story_id).subscribe(res => console.log(res),err => console.log(err));
    window.location.reload();
  }
}
