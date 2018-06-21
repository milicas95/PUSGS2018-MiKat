import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Service } from '../Models/service.model';
import { debug } from 'util';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { Branch } from 'src/app/Models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user.model';

@Injectable()
export class ServiceService {

  constructor(private http:HttpClient, private router:Router) { }

  getMethod():Observable<any>
  {
    //debugger
    return this.http.get('http://localhost:51680/api/services');
  }
  getActiveServices():Observable<any>
  {
    //debugger
    return this.http.get('http://localhost:51680/api/services/getactive');
  }

  postMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/services",newMember)
    .subscribe(
      data => { this.router.navigate(['/manager']) }, // Reach here if res.status >= 200 && <= 299
      err => {} // Reach here if fails
    );
  }
  
  deleteMethod(id:number):void
  {
    this.http.delete('http://localhost:51680/api/services/' + id)
    .subscribe(
      data=>{this.router.navigate(['/manager'])},
      err=>{}
    );
  }

  getService(id:number):Observable<any>
  {
    return this.http.get('http://localhost:51680/api/services/' + id);
  }

  postVehiclesMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/Vehicles",newMember)
    .subscribe(
      data => { this.router.navigate(['/manager']) }, // Reach here if res.status >= 200 && <= 299
      err => {} // Reach here if fails
    );
  }

  deleteVehiclesMethod(id:number):void
  {
    this.http.delete('http://localhost:51680/api/Vehicles/' + id)
    .subscribe(
      data=>{ this.router.navigate(['/manager']) },
      err=>{}
    );
  }

  getVehiclesMethod(id:number):Observable<any>
  {
      return this.http.get('http://localhost:51680/api/Vehicles/' + id);
  }

  getBranchesMethod(id:number):Observable<any>
  {
      return this.http.get('http://localhost:51680/api/Branches/' + id);
  }

  postBranchesMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/Branches",newMember)
    .subscribe(
      (data)=>{ this.router.navigate(['/manager']) },
      (err)=>{}
    );
  }

  deleteBranchesMethod(id:number):void
  {
    this.http.delete('http://localhost:51680/api/Branches/' + id)
    .subscribe(
      data=>{ this.router.navigate(['/manager']) },
      err=>{}
    );
  }

  confirm(user:User):void
  {
    this.http.post("http://localhost:51680/ConfirmUser",user)
    .subscribe(
      data=>{},
      err=>{}
    )
  }

  ban(user:User):void
  {
    this.http.post("http://localhost:51680/BanManager",user)
    .subscribe(
      data=>{},
      err=>{}
    )
  }

  approve(service:Service):void
  {
    this.http.post("http://localhost:51680/ApproveService",service)
    .subscribe(
      data=>{},
      err=>{}
    )
  }

  getServers():Observable<any>
  {
    return this.http.get("http://localhost:51680/GetServices");
  }

  giveComment(com:Comment)
  {
    this.http.post("http://localhost:51680/GiveComment",com)
    .subscribe(
      (data)=>{debugger},
      (err)=>{debugger}
    )
  }

  updateService(service:Service)
  {
    this.http.put("http://localhost:51680/api/services/"+service.Id, service)
    .subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }

  updateVehicle(vehicle:Vehicle)
  {
    this.http.put("http://localhost:51680/api/vehicles/"+vehicle.Id, vehicle)
    .subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }
}
