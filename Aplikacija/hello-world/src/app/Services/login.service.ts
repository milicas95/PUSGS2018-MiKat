import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {
  constructor(private http:Http,private router:Router) 
  { 

  }

  getToken(user:User)
  {
    let headers=new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded');

    if(!localStorage.jwt)
    {
      let x=this.http.post('http://localhost:51680/oauth/token','username='+user.Name+'&password='+user.Password+'&grant_type=password',{"headers":headers}) as Observable<any>;
      //debugger
      x.subscribe(
        res=>
        { 
          //debugger
          res = res.json()
          console.log(res);
          
          let jwt=res.access_token;
          //debugger
          let jwtData=jwt.split('.')[1]
          debugger
          let decodedJwtJsonData=window.atob(jwtData)
          let decodedJwtData=JSON.parse(decodedJwtJsonData)
          let role=decodedJwtData.role
          debugger
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
      // promena rute ako je korisnik/admin/manager
      this.router.navigate(['/user']);
      /*let x=this.http.get('http://localhost:51680/api/Services') as Observable<any>;
      
      x.subscribe(
        res=>
        {
          //debugger
          console.log(res);
        },
        err=>
        {
          console.log("Error occured while getting token in get part");
        }
      )*/
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
}
}
