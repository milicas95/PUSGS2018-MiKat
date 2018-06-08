import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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

  postMethod(newMember):Observable<any>
  {
    return this.http.post("http://localhost:51680/api/services",newMember)
    .map(this.parseData)
    .catch(this.handleError);
  }
}
