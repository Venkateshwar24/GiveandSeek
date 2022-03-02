import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email_id : '',
    user_password : ''
  }
  constructor(private authService:AuthService,
    private _router : Router) { }

  ngOnInit(): void {
  }
  onLogin()
  {
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res=> {
        localStorage.setItem('token',res.token)
        this._router.navigate(['']);
      },
      err=>console.log(err)
    );
  }

}
