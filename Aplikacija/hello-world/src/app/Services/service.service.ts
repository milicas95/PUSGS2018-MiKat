import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Service } from '../Models/service.model';

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
    //debugger
    this.http.post("http://localhost:51680/api/services",newMember)
    .subscribe(
      (data) => {debugger}, // Reach here if res.status >= 200 && <= 299
      (err) => {debugger} // Reach here if fails
    );
  }

  getVehiclesMethod(id:number):Observable<any>
  {
    return this.http.get('http://localhost:51680/api/services/' + id)
    .map(this.parseData)
    .catch(this.handleError);
  }

  /*search(term:string):Observable<Service>
  {
    if (!term.trim()) {
      // if not search term, return empty array
      return null;
    }

     return this.http.get<Service[]>('http://localhost:51680/?name=${term}')
    .map(this.parseData)
    .catch(this.handleError);
  }*/
}
