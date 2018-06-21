import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Service } from '../Models/service.model';
import { debug } from 'util';

@Injectable()
export class ServiceService {

  constructor(private http:HttpClient ) { }

  getMethod():Observable<any>
  {
    //debugger
    return this.http.get('http://localhost:51680/api/services');
  }

  postMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/services",newMember)
    .subscribe(
      data => {}, // Reach here if res.status >= 200 && <= 299
      err => {} // Reach here if fails
    );
  }
  
  deleteMethod(id:number):void
  {
    this.http.delete('http://localhost:51680/api/services/' + id)
    .subscribe(
      data=>{},
      err=>{}
    );
  }

  getVehiclesMethod(id:number):Observable<any>
  {
    return this.http.get('http://localhost:51680/api/services/' + id);
  }

  postVehiclesMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/Vehicles",newMember)
    .subscribe(
      data => {}, // Reach here if res.status >= 200 && <= 299
      err => {} // Reach here if fails
    );
  }

  deleteVehiclesMethod(id:number):void
  {
    this.http.delete('http://localhost:51680/api/Vehicles/' + id)
    .subscribe(
      data=>{},
      err=>{}
    );
  }

  getBranchesMethod(id:number):Observable<any>
  {
      return this.http.get('http://localhost:51680/api/Branches/' + id);
  }

  postBranchesMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/Branches",newMember)
    .subscribe(
      (data)=>{},
      (err)=>{}
    );
  }

  deleteBranchesMethod(id:number):void
  {
    this.http.delete('http://localhost:51680/api/Branches/' + id)
    .subscribe(
      data=>{},
      err=>{}
    );
  }
}
