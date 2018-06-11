import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http/src/headers';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  getToken()
  {
    let headers=new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded');

    if(!localStorage.jwt)
    {
      let x=this.http.post('http://localhost:51680/oauth/token',`username=admin&password=admin&grant_type=password`,{"headers":headers}) as Observable<any>;
      
      x.subscribe(
        res=>
        { 
          res = res.json()
          console.log(res);
          
          let jwt=res.access_token;
          debugger
          let jwtData=jwt.split('.')[1]
          let decodedJwtJsonData=window.atob(jwt)
          let decodedJwtData=JSON.parse(decodedJwtJsonData)
          let role=decodedJwtData.role

          console.log('jwtData: ' + jwtData)
          console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
          console.log('decodedJwtData: ' + decodedJwtData)
          console.log('Role ' + role)
          
          localStorage.setItem('jwt',jwt)
          localStorage.setItem('role',role);
        },
        err =>
        {
          console.log("Error occured while getting token in post part");
        }
      );
    }
    else
    {
      let x=this.http.get('http://localhost:51680/api/Services') as Observable<any>;
      
      x.subscribe(
        res=>
        {
          console.log(res);
        },
        err=>
        {
          console.log("Error occured while getting token in get part");
        }
      );
    }
  }
}
