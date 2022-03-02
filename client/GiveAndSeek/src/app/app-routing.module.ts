import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'services/auth.guard';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { StoryuploadComponent } from './storyupload/storyupload.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent

  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'storyupload',
    component:StoryuploadComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'stories/:s_id',
    component:StoryPageComponent
  },
  {
    path:'chatroom/:s_id',
    component:ChatRoomComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
