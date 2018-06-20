import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Reservation } from '../Models/reservation.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservationService {

  constructor(private http:HttpClient) { }
    
  Reserve(reservation: Reservation){
    debugger
        this.http.post("http://localhost:51680/api/Rents",reservation)
        .subscribe(
          data => {debugger}, // Reach here if res.status >= 200 && <= 299
          err => {debugger} // Reach here if fails
        );
    }
}
