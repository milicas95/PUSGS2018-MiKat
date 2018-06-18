import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../Models/service.model';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../Services/service.service';
import { Branch } from '../Models/branch.model';
import { ManagerService } from '../Services/manager.service';
import { Vehicle } from '../Models/vehicle.model';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
const URL='http://localhost:51680/api/PostUserImage';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [ ServiceService ]
})
export class ManagerComponent implements OnInit {
  private selectedService:Service;
  private vehicles:Vehicle[];
  private serviceList:Service[];
  isVisible = true;
  isVisible1 = true;
  public uploader:FileUploader=new FileUploader({url:URL,itemAlias:'photo'});
  url:string[];

  constructor(private service:ServiceService,private router:Router,private activated:ActivatedRoute) 
  { 
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false};
  this.uploader.onCompleteItem=(item:any,response:any,status:any,headers:any)=>
  {
    this.url.push(JSON.parse(response));

  }    
  }

  ngOnInit() {
    this.serviceList=[];
    this.callGet();
  }

  toggle():void {
    this.isVisible = !this.isVisible;
  }

  toggle1():void {
    this.isVisible1 = !this.isVisible1;
  }

  onSelect(s:Service):void
  {
    this.vehicles=[];
    this.service.getVehiclesMethod(s.Id)
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
    this.service.getMethod()
    .subscribe(
      data=> {
        this.serviceList=data;
      },
      error=>
      {
        
      }
    )
  }

  addService(model:Service,form:NgForm)
  {
    this.service.postMethod(model);
    console.log(model);
    form.reset();
  }

  addVehicles(model:Vehicle,form:NgForm)
  {
    model.Service=this.selectedService;
    this.service.postVehiclesMethod(model);
    console.log(model);
    form.reset();
  }

  addBranches(model:Branch,form:NgForm)
  {
    debugger
    model.Service=this.selectedService;
    this.service.postBranchesMethod(model);
    console.log(model);
    form.reset();
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();


      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    }
  }
}