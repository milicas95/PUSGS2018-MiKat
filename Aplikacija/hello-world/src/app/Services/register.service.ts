import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private http:HttpClient) { }

  postMethod(newMember):void
  {
    debugger
    this.http.post("http://localhost:51680/api/Account/Register",newMember)
    .subscribe(
      (data) => {debugger}, // Reach here if res.status >= 200 && <= 299
      (err) => {debugger} // Reach here if fails
    );
  }
}
