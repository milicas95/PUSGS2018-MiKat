import { Component, OnInit } from '@angular/core';
import { CanActivateViaAuthGuard } from '../Tokens/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Tokens/interceptor';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../Models/user.model';
import { ProfileService } from '../Services/profile.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Reservation } from 'src/app/Models/reservation.model';

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
  
  private url:string;
  private profileService:ProfileService;
  private rentsList:Reservation[];

  constructor(private service:ProfileService) 
  { 
    this.profileService=service;
    this.rentsList=[];
  }

  ngOnInit() {
    this.getRents();
  }
  
  getRents(){
    this.profileService.getRents()
    .subscribe(
      data=>{ this.rentsList=data; },
      error=>{}
    )
  }

  onSubmit(model:string,form:NgForm)
  {
    this.url=model;
    this.profileService.upload(model);
    form.reset();
  }
}
