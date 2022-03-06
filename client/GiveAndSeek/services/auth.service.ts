import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupurl = 'http://localhost:8000/users';
  private loginurl = 'http://localhost:8000/users/login';
  constructor(private http: HttpClient,
    private router: Router) { }


public loggedIn_user_id;
  signupUser(user) {
    return this.http.post<any>(this.signupurl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this.loginurl, user);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);

  }

  getToken() {
    return localStorage.getItem('token');
  }


  async getUser() {
    return new Promise<void>((resolve, reject) => {
      let user;
      const token = this.getToken();
       this.http.get(`http://localhost:8000/users/${token}`)
        .subscribe(
       res => {
            user = res;
            this.loggedIn_user_id = user._id;
           
          });
      resolve();
  });
    
  }

  

}
