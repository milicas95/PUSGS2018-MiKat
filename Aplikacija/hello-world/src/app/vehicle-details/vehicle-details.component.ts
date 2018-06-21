import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/Models/service.model';
import { ServiceService } from 'src/app/Services/service.service';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
  providers: [ServiceService]
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicle:Vehicle;

  constructor(private serviceService:ServiceService, private router:Router) 
  {     
  }

  ngOnInit() {
  }

  deleteVehicle()
  {
    debugger
    this.serviceService.deleteVehiclesMethod(this.vehicle.Id);
    console.log("Vehicle has been deleted");
    this.router.navigate(['/manager']);
  }

  onSubmit(model:Vehicle,form:NgForm)
  {
    debugger
    if(model.Model != "")
    this.vehicle.Model = model.Model;
    if(model.Manufactor != "")
    this.vehicle.Manufactor = model.Manufactor;
    if(model.Description != "")
    this.vehicle.Description = model.Description;
    if(model.Year != "")
    this.vehicle.Year = model.Year;
    if(model.PricePerHour != "")
    this.vehicle.PricePerHour = model.PricePerHour;
    if(model.Unavailable != false)
    this.vehicle.Unavailable = true;
    this.serviceService.updateVehicle(this.vehicle);
  }
}
