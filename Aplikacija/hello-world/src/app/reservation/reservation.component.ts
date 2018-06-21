import { Component, OnInit } from '@angular/core';
import { CanActivateViaAuthGuard } from '../Tokens/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Tokens/interceptor';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationService } from '../Services/reservation.service';
import { Vehicle } from '../Models/vehicle.model';
import { Branch } from '../Models/branch.model';
import { Service } from '../Models/service.model';
import { ServiceService } from '../Services/service.service';
import { Reservation } from '../Models/reservation.model';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/Models/comment.model';
import { User } from 'src/app/Models/user.model';
import { ProfileService } from '../Services/profile.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [
    CanActivateViaAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ReservationService,
    ServiceService,
    ProfileService
  ]
})
export class ReservationComponent implements OnInit {
  private selectedService:Service;
  private rentVehicle:Vehicle;
  private vehicles:Vehicle[];
  private serviceList:Service[];
  private branches:Branch[];
  private startBranch:Branch;
  private endBranch:Branch;
  private date:number;
  private isVisible=true;
  private buttonDisabled=true;

  constructor(private service:ReservationService,private serviceService:ServiceService,private profileService:ProfileService) 
  { 
    this.date = Date.now();
  }

  ngOnInit() {
    this.serviceList=[];
    this.vehicles=[];
    this.branches=[];
    this.callGet();
  }

  toggle(vehicle:Vehicle):void {
    this.isVisible = !this.isVisible;
    this.rentVehicle=vehicle;
  }

  addComment()
  {
    this.buttonDisabled=!this.buttonDisabled;

  }

  callGet()
  {
    this.serviceService.getMethod()
    .subscribe(
      data=> {
        this.serviceList=data;
      },
      error=>
      {
        
      }
    )
  }

  onSubmit(res:Reservation,form:NgForm)
  {
    //debugger
    res.Vehicle=this.rentVehicle;
    this.service.Reserve(res);
    form.reset();
  }

  onSelect(s:Service):void
  {
    this.vehicles=[];
    this.serviceService.getVehiclesMethod(s.Id)
    .subscribe(
      data=>{
      this.selectedService=data;
      this.vehicles=this.selectedService.Vehicles;
      this.branches=this.selectedService.Branches;
      },
      error=>
      {
  
      }
    )
  }

  giveComment(com:any,form:NgForm)
  {
    this.profileService.getUser()
    .subscribe(
      data=>
      { 
        com.User=data;
        com.Service=this.selectedService;
        this.serviceService.giveComment(com);
      },
      err=>{ }
    )
  }
}
