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

  private vehicle:Vehicle;
  private vehicleService:Service;
  private branches:Branch[];
  private date:number;
  private reservationService:ReservationService;

  constructor(private service:ReservationService,private serviceService:ServiceService) 
  { 
    this.reservationService=service;
    this.date = Date.now();
  }

  ngOnInit() {
    this.getVehicle();
  }

  onSubmit(res:Reservation,form:NgForm)
  {
    this.reservationService.Reserve(res);
    form.reset();
  }

  getVehicle(){
    this.reservationService.getVehicle()
    .subscribe(
      data => {
        this.vehicle = data;
         this.branches = this.vehicle.Service.Branches;
      }
    );
  }
}
