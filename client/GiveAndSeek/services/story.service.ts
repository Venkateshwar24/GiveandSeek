import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private storyurl = 'http://localhost:8000/stories';
  constructor(private http:HttpClient) { }

  postStories(storyData)
  {
    return this.http.post<any>(this.storyurl,storyData);
  }

  getStories()
  {
    return this.http.get<any>(this.storyurl);
  }
  patchUpdateStories(updateData, story_id)
  {
    return this.http.patch<any>(`http://localhost:8000/stories/${story_id}`, updateData);
  }


  postComments(commentData,story_id)
  {
    return this.http.post<any>(`http://localhost:8000/stories/comments/${story_id}`, commentData);
  }

  getComments(story_id)
  {
    return this.http.get<any>(`http://localhost:8000/stories/comments/${story_id}`);
  }


  fetchRooms() {
    return this.http.get<any>('http://localhost:8000/rooms');
  }

}
