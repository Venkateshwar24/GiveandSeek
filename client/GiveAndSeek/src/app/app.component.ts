import { Component } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GiveAndSeek';
  public isMenuCollapsed = true;
  constructor(public authService: AuthService){}
}
