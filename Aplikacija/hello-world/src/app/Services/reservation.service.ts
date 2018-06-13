import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Reservation } from '../Models/reservation.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ReservationService {

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

  getVehicle(): Observable<any>
    {
        return this.http.get("http://localhost:51680/api/Reservation")
        .map(this.parseData)
        .catch(this.handleError);
    }
    
    Reserve(reservation: Reservation){
        this.http.post("http://localhost:51680/api/Reservation",reservation)
        .subscribe(
          (data) => {debugger}, // Reach here if res.status >= 200 && <= 299
          (err) => {debugger} // Reach here if fails
        );
    }
}
