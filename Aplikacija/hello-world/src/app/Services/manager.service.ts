import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable' ;
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Branch } from '../Models/branch.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ManagerService {

  constructor(private http:Http) { }

  postService(newMember):void
  {
      this.http.post("http://localhost:51680/api/services",newMember)
      .subscribe(
        data => {},
        err=> {}
      );
  }
}
