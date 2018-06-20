import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {providedIn:'root'}
)
export class LoginService {
  public error:string;
  constructor(private http:HttpClient,private router:Router) 
  { 

  }

  getToken(user:User)
  {
    let headers=new HttpHeaders();
    headers.append('Content-type','application/x-www-form-urlencoded');

    if(!localStorage.jwt)
    {
      let x=this.http.post('http://localhost:51680/oauth/token','username='+user.Name+'&password='+user.Password+'&grant_type=password',{"headers":headers}) as Observable<any>;
      //debugger
      x.subscribe(
        res=>
        {        
          let jwt=res.access_token;
          //debugger
          let jwtData=jwt.split('.')[1]
          debugger
          let decodedJwtJsonData=window.atob(jwtData)
          let decodedJwtData=JSON.parse(decodedJwtJsonData)
          let role=decodedJwtData.role

          console.log('jwtData: ' + jwtData)
          console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
          console.log('decodedJwtData: ' + decodedJwtData)
          console.log('Role ' + role)
          
          localStorage.setItem('jwt',jwt)
          localStorage.setItem('role',role);
          // da mogu da izvucem token trenutnog korisnika

          //debugger
          //if(localStorage.getItem('role')=="AppUser")
            this.router.navigate(['/profile']);    
          
          this.error="";

        },
        err =>
        {
          console.log("Error occured while getting token in post part");
          this.error="Email or password is incorrect";
        }
      );
    }
    else
    { 
      debugger
      //if(localStorage.getItem('role')=="AppUser")
        this.router.navigate(['/service']); 

      this.error="";
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
    localStorage.clear();
    this.router.navigate(['/service']);
  }
}
