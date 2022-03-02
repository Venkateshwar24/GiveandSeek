import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from 'services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptorService } from 'services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { StoryuploadComponent } from './storyupload/storyupload.component';
import { StoryCardComponent } from './story-card/story-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarousalComponent } from './carousal/carousal.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { DocumentsViewComponent } from './documents-view/documents-view.component';
import { UpdateViewComponent } from './update-view/update-view.component'
import {MatStepperModule} from '@angular/material/stepper';
import { CommentsViewComponent } from './comments-view/comments-view.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    StoryuploadComponent,
    StoryCardComponent,
    DashboardComponent,
    CarousalComponent,
    StoryPageComponent,
    DocumentsViewComponent,
    UpdateViewComponent,
    CommentsViewComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatStepperModule
  ],
  providers: [AuthService,TokenInterceptorService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
