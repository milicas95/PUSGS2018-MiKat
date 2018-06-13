import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../Models/user.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Reservation } from 'src/app/Models/reservation.model';

@Injectable()
export class ProfileService {

  constructor(private http:Http) { }
  
    private parseData(res:Response)
    {
      return res.json() || [];
    }
  
    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }

    // pitati Acu kako da izvucem token zbog prikaza informacija o trenutnom korisniku
    getRents(): Observable<Reservation[]>
    {
        return this.http.get("http://localhost:51680/api/")
        .map(this.parseData)
        .catch(this.handleError);
    }

    // dodaje sliku = novi kontroler
    upload(url:string)
    {
      this.http.post("http://localhost:51680/api/",url);
    }
}
