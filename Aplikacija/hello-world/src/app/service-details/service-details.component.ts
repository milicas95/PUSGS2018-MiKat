import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../Models/service.model';
import { ServiceService } from '../Services/service.service';
import { Vehicle } from 'src/app/Models/vehicle.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  @Input() service:Service;

  private buttonDisabled=true;

  constructor(private serviceService:ServiceService) 
  { 
    if( localStorage.role != "AppUser" )
    {
      this.buttonDisabled = false;
    }
  }

  ngOnInit() {
  }

  deleteService()
  {
    this.serviceService.deleteMethod(this.service.Id);
    console.log("Service " + this.service.Id + " has been deleted");
  }
}
