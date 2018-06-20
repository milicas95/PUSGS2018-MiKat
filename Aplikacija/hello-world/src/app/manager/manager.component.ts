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
  private branches:Branch[];
  private serviceList:Service[];
  private isVisible = true;
  private isVisible1 = true;
  private isVisible2 = true;
  
  imageUrl:string="/assets/img/images.png";
  fileToUpload:File=null;

  constructor(private service:ServiceService,private router:Router,private activated:ActivatedRoute) 
  { 
  }    

  ngOnInit() {
    this.serviceList=[];
    this.vehicles=[];
    this.branches=[];
    this.callGet();
  }

  handleFileInput(file:FileList)
  {
    this.fileToUpload=file.item(0);

    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }

  toggle():void {
    this.isVisible = !this.isVisible;
  }

  toggle1():void {
    this.isVisible1 = !this.isVisible1;
  }

  toggle2():void {
    this.isVisible2 = !this.isVisible2;
  }

  onSelect(s:Service):void
  {
    this.vehicles=[];
    this.service.getVehiclesMethod(s.Id)
    .subscribe(
      data=>{
      this.selectedService=data;
      this.vehicles=this.selectedService.Vehicles;
      this.branches = this.selectedService.Branches;
      },
      error=>
      {
  
      }
    )
  }

  addImage(Logo)
  {
    debugger
    this.service.postImageMethod(Logo);
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
    debugger
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

  deleteVehicle()
  {
    this.service.deleteVehiclesMethod(this.selectedService.Id);
    console.log("Vehicle has been deleted");
  }

  deleteBranch()
  {
    debugger
    this.service.deleteBranchesMethod(this.selectedService.Id);
    console.log("Branch has been deleted");
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();


      reader.onload = (event:any) => { // called once readAsDataURL is completed
        //this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    }
  }
}