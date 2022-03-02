import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'services/story.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storyupload',
  templateUrl: './storyupload.component.html',
  styleUrls: ['./storyupload.component.css']
})
export class StoryuploadComponent implements OnInit {
  newStoryData: FormGroup;
  user;
  proofSubmitted=[];
 fundRequired = false;
  constructor(private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private storyService: StoryService,
    private _route: Router) {
    this.newStoryData = this.fb.group({
      story_title: ['',[Validators.required]],
      recipient_name: [''],
      story_description: [''],
      isfundRequired: [''],
      documents_proof:[''],
      bank_name:[''],
      holder_name:[''],
      account_number:[''],
      ifsc_code:[''],
      upi_id:['']
    });
  }





  ngOnInit(): void {
    this.getUser();
  }




  getUser() {
    const token = this.authService.getToken();
    this.http.get(`http://localhost:8000/users/${token}`)
      .subscribe(
        res => this.user = res);
  }

  onFileChange(event:any) {
    
    if(event.target.files && event.target.files[0])
    {
      // const reader = new FileReader();
      // reader.onload = () => {
        const files: FileList = event.target.files;
        for(let i=0; i<files.length; i++)
        {
          this.proofSubmitted.push(files[i]);
        }
        
      // };
      // reader.readAsDataURL(event.target.files[0]);
    }
  }
  checkFundRequired(event)
{
  if(event.target.checked == true)
   this.fundRequired = true;
  else
   this.fundRequired = false; 
}

  onStorySubmit() {
   const formData = new FormData();
    formData.append('story_title', this.newStoryData.get('story_title').value);
    formData.append('recipient_name', this.newStoryData.get('recipient_name').value);
    formData.append('story_description', this.newStoryData.get('story_description').value);
    if(this.newStoryData.get('isfundRequired').value ==''){
      formData.append('isfundRequired', 'false');}
    else{
    formData.append('isfundRequired', this.newStoryData.get('isfundRequired').value);}
    for(let i=0; i<this.proofSubmitted.length; i++)
    {
      formData.append('documents_proof[]', this.proofSubmitted[i]);
    }
    
    formData.append('user_id', this.user._id);
    formData.append('user_name', this.user.user_name);
    formData.append('bank_name', this.newStoryData.get('bank_name').value);
    formData.append('holder_name', this.newStoryData.get('holder_name').value);
    formData.append('account_number', this.newStoryData.get('account_number').value);
    formData.append('ifsc_code', this.newStoryData.get('ifsc_code').value);
    formData.append('upi_id', this.newStoryData.get('upi_id').value);

    this.storyService.postStories(formData)
      .subscribe(
        res =>{console.log(res);
          this._route.navigate(['/']);
        } ,
        err => console.log(err)
      )
     
  }
}
