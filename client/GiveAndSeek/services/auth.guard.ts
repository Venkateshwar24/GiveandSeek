import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router){}
canActivate():boolean
{
if(this.authService.isLoggedIn())
{
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
