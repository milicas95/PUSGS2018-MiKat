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
    ServiceService
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

  constructor(private service:ReservationService,private serviceService:ServiceService) 
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
    debugger
    res.Vehicle=this.rentVehicle;
    //this.serviceService.getBranchesMethod(res.BeginBranch.Id)
    //.subscribe(
    //  data=>{
    //    this.startBranch=data;
    //    this.serviceService.getBranchesMethod(res.EndBranch.Id)
    //    .subscribe(
    //      data=>{
    //        this.endBranch=data;
    //        res.BeginBranch=this.startBranch;
    //        res.EndBranch=this.endBranch;
            this.service.Reserve(res);
    //      }
    //    );
    //  }
    //);
    
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
}
