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

const URL='http://localhost:51680/api/postImage';
const URL1='http://localhost:51680/api/postVehicleImage';
const URL2='http://localhost:51680/api/postBranchImage';

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
  
  public uploader:FileUploader;
  public url:string;
  public uploadFile:any;

  public uploader1:FileUploader;
  public url1:string;
  public uploadFile1:any;

  public uploader2:FileUploader;
  public url2:string;
  public uploadFile2:any;

  constructor(private service:ServiceService,private router:Router,private activated:ActivatedRoute) 
  { 
    this.uploader=new FileUploader({url:URL,itemAlias:'Logo'});
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;};
    this.uploader.onCompleteItem=(item:any,response:any,status:any,headers:any)=>{
      this.url=JSON.parse(response);
    }

    this.uploader1=new FileUploader({url:URL1,itemAlias:'Photo'});
    this.uploader1.onAfterAddingFile=(file)=>{file.withCredentials=false;};
    this.uploader1.onCompleteItem=(item:any,response:any,status:any,headers:any)=>{
      this.url1=JSON.parse(response);
    }

    this.uploader2=new FileUploader({url:URL2,itemAlias:'Logo'});
    this.uploader2.onAfterAddingFile=(file)=>{file.withCredentials=false;};
    this.uploader2.onCompleteItem=(item:any,response:any,status:any,headers:any)=>{
      this.url2=JSON.parse(response);
    }
  }    

  ngOnInit() {
    this.serviceList=[];
    this.vehicles=[];
    this.branches=[];
    this.callGet();
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
    model.Logo=this.url;
    this.service.postMethod(model);
    console.log(model);
    form.reset();
  }

  addVehicles(model:Vehicle,form:NgForm)
  {
    model.Photo=this.url1;
    model.Service=this.selectedService;
    this.service.postVehiclesMethod(model);
    console.log(model);
    form.reset();
  }

  addBranches(model:Branch,form:NgForm)
  {
    model.Logo=this.url2;
    model.Service=this.selectedService;
    this.service.postBranchesMethod(model);
    console.log(model);
    form.reset();
  }

  deleteVehicle(vehicle:Vehicle)
  {
    debugger
    this.service.deleteVehiclesMethod(vehicle.Id);
    console.log("Vehicle has been deleted");
  }

  deleteBranch(branch:Branch)
  {
    debugger
    this.service.deleteBranchesMethod(branch.Id);
    console.log("Branch has been deleted");
  }
}