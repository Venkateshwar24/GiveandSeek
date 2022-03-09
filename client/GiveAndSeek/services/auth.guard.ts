import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router,
    private http:HttpClient){}
 canActivate():boolean
{
if(this.authService.isLoggedIn())
{
  // let user;
  //     const token = this.authService.getToken();
  //      this.http.get<any>(`http://localhost:8000/users/${token}`).toPromise().then(
  //      res => {
  //           user = res;
  //           this.authService.loggedIn_user_id = user._id;
           
  //         });
return true;
}
else
{
alert('Please Login to continue');
this.router.navigate(['/login']);
return false;
}

}
  
}
