import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { Service } from '../Models/service.model';
import { NgForm } from '@angular/forms';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { Branch } from 'src/app/Models/branch.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ServiceService]
})

export class ServiceComponent implements OnInit 
{
  private serviceModel:Service;
  private serviceList:Service[];
  private serviceService:ServiceService;
  private selectedService:Service;
  private vehicles:Vehicle[];
  private branches:Branch[];  
  private buttonDisabled=true;

  constructor(private service:ServiceService) 
  { 
    this.serviceService=service;
    this.serviceList=[];
    this.vehicles=[];
    this.branches=[];

    if( localStorage.role != "AppUser" )
    {
      this.buttonDisabled = false;
    }
  }

  ngOnInit() {
    //debugger
    this.callGet();
  }

  onSubmit(model:Service,form:NgForm)
  {
    this.serviceModel=model;
    this.serviceList.push(model);
    this.serviceService.postMethod(model);
    console.log(model);
    form.reset();
  }

  onSelect(s:Service):void
  {
    this.vehicles=[];
    this.serviceService.getService(s.Id)
    .subscribe(
      data=>{
      this.selectedService=data;
      this.vehicles=this.selectedService.Vehicles;
     },
     error=>
     {
  
     }
    )
  }

  callGet()
  {
    this.serviceService.getMethod()
    .subscribe(
      data=> {
        debugger
        this.serviceList=data;
      },
      error=>
      {
        
      }
    )
  }
}
