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

  constructor(private http:Http ) { }

  private parseData(res:Response)
  {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  getMethod():Observable<any>
  {
    //debugger
    return this.http.get('http://localhost:51680/api/services')
    .map(this.parseData)
    .catch(this.handleError);
  }



  postMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/services",newMember)
    .subscribe(
      data => {}, // Reach here if res.status >= 200 && <= 299
      err => {} // Reach here if fails
    );
  }

  getVehiclesMethod(id:number):Observable<any>
  {
    return this.http.get('http://localhost:51680/api/services/' + id)
    .map(this.parseData)
    .catch(this.handleError);
  }

  postVehiclesMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/Vehicles",newMember)
    .subscribe(
      data => {}, // Reach here if res.status >= 200 && <= 299
      err => {} // Reach here if fails
    );
  }

  postBranchesMethod(newMember):void
  {
    this.http.post("http://localhost:51680/api/Branches",newMember)
    .subscribe(
      (data)=>{debugger},
      (err)=>{debugger}
    );
  }
}
