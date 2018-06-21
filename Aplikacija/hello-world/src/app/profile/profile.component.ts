import { Component, OnInit, Input } from '@angular/core';
import { CanActivateViaAuthGuard } from '../Tokens/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Tokens/interceptor';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../Models/user.model';
import { ProfileService } from '../Services/profile.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Reservation } from 'src/app/Models/reservation.model';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL='http://localhost:51680/api/postUserImage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    CanActivateViaAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ProfileService]
})
export class ProfileComponent implements OnInit {
  private clicked=false;
  private profileService:ProfileService;
  private rentsList:Reservation[];
  public user:User;
  private confirmedUser:boolean;
  
  public uploader:FileUploader;
  public url:string;
  public uploadFile:any;

  constructor(private service:ProfileService, private router:Router) 
  { 
    this.profileService=service;
    this.rentsList=[];
    this.uploader=new FileUploader({url:URL,itemAlias:'PersonalDocument'});
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;};
    this.uploader.onCompleteItem=(item:any,response:any,status:any,headers:any)=>{
      this.url=JSON.parse(response);
    }
  }

  ngOnInit() {
    this.getRents();
    this.getUser();
  }

  toggle():void
  {
    this.clicked=!this.clicked;
  }

  getUser()
  {
    this.profileService.getUser()
    .subscribe(
      data=>
      {
        this.user = data;
        this.confirmedUser=this.user.Activated;        
      },
      error=>
      {
        console.log(error);
      }
    )
  }
  
  getRents(){
    this.profileService.getRents()
    .subscribe(
      data=>{ this.rentsList=data; },
      error=>{}
    )
  }

  onSubmit(model:User,form:NgForm)
  {
    debugger
    if(model.FullName != "")
    this.user.FullName = model.FullName;
    if(model.Email != "")
    this.user.Email = model.Email;
    if(model.Birthday != null)
    this.user.Birthday = model.Birthday;
    this.user.PersonalDocument=this.url;
    this.profileService.updateUser(this.user);
    // this.url=model;
    // this.profileService.upload(model);
    // form.reset();
  }

  changePassword()
  {
    this.router.navigate(['/password']);
  }
}
