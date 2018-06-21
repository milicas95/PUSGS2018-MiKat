import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../Models/service.model';
import { ServiceService } from '../Services/service.service';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
  providers: [ServiceService]
})
export class ServiceDetailsComponent implements OnInit {

  @Input() service:Service;

  private vehicles:Vehicle[];

  constructor(private serviceService:ServiceService,private router:Router) 
  { 
  }

  ngOnInit() {
  }

  deleteService()
  {
    this.serviceService.deleteMethod(this.service.Id);
    console.log("Service " + this.service.Id + " has been deleted");
    this.router.navigate(['/manager']);
  }

  onSubmit(model:Service,form:NgForm)
  {
    if(model.Name != "")
    this.service.Name = model.Name;
    if(model.Email != "")
    this.service.Email = model.Email;
    if(model.Description != "")
    this.service.Description = model.Description;
    this.serviceService.updateService(this.service);
  }


}
