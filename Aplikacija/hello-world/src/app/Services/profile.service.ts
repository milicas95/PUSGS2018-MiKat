import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../Models/user.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Reservation } from 'src/app/Models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Password } from 'src/app/Models/password.model';

@Injectable()
export class ProfileService {

  constructor(private http:HttpClient) { }

    // prosiriti backend da na osnovu emaila nadje ostale informacije u korisniku
    getUser():Observable<any>
    {
      return this.http.get("http://localhost:51680/api/UserInfo");

    }

    getUsers():Observable<any>
    {
      return this.http.get("http://localhost:51680/api/AppUsers");
    }

    getManagers():Observable<any>
    {
      return this.http.get("http://localhost:51680/GetManagers");
    }

    getRents(): Observable<any>
    {
        return this.http.get("http://localhost:51680/api/Rents");
    }

    // dodaje sliku = novi kontroler
    upload(url:string)
    {
      this.http.post("http://localhost:51680/api/",url);
    }

    updateUser(user:User):void
    {
      this.http.put("http://localhost:51680/api/appusers/"+user.Id, user)
      .subscribe(
        data=>{console.log(data)},
        err=>{console.log(err)}
      );
    }

    changePassword(password:Password): Observable<any>
    {
      debugger
      return this.http.post("http://localhost:51680/api/Account/ChangePassword",password);
    }
}
