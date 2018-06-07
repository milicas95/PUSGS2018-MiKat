import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { Service } from '../Models/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ServiceService]
})

export class ServiceComponent implements OnInit {

private serviceModel:Service;

  constructor(private serviceService:ServiceService) { }

  ngOnInit() {
  }

  callGet()
  {
    this.serviceService.getMethod()
    .subscribe(
      data=> {
        this.serviceModel=data;
      },
      error=>
      {
        
      }
    )
  }
}
