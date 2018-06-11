import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  postMethod(newMember):void
  {
    // promeniti putanju da radi interpreter za tokene /oauth/token
    this.http.post("http://localhost:51680/api/services",newMember)
    .subscribe(
      (data) => {debugger}, // Reach here if res.status >= 200 && <= 299
      (err) => {debugger} // Reach here if fails
    );
  }
}
