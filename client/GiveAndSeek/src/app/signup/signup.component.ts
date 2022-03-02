import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signedupuser = {
    user_name:"",
    email_id:"",
    user_password:"",
    mob_no:""
  }
  constructor(private authService:AuthService,
    private _route : Router) { }

  ngOnInit(): void {
  }


  
  onSignup()
  {
    this.authService.signupUser(this.signedupuser)
   .subscribe(
     res=>{
       console.log(res)
       //localStorage.setItem('token',res.token)
     },
     err=>console.log(err)
   
    
   )
   alert("Successfully Registered");
   //this._route.navigate(['/moviesuggestions']);
 }
 
}
