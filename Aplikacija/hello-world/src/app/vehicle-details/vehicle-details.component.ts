import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/Models/service.model';
import { ServiceService } from 'src/app/Services/service.service';
import { Vehicle } from 'src/app/Models/vehicle.model';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() service:Service;

  private vehicles:Vehicle;
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

  deleteVehicle()
  {
    debugger
    this.serviceService.deleteVehiclesMethod(this.service.Id);
    console.log("Vehicle has been deleted");
  }
}
