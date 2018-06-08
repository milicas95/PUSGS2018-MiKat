import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { Service } from '../Models/service.model';
import {NgForm} from '@angular/forms';

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

  constructor(private service:ServiceService) 
  { 
    this.serviceService=service;
    this.serviceList=[];
  }

  ngOnInit() {
  }

  onSubmit(model:Service,form:NgForm)
  {
    this.serviceModel=model;
    this.serviceList.push(model);
    debugger
    this.serviceService.postMethod(model);
    console.log(model);
    form.reset();
  }

  callGet()
  {
    this.serviceService.getMethod()
    .subscribe(
      data=> {
        //debugger
        this.serviceList=data;
      },
      error=>
      {
        
      }
    )
  }
}
