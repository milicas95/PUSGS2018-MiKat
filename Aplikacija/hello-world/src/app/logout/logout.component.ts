import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LoginService]
})
export class LogoutComponent implements OnInit {
  private loginService:LoginService
  
  constructor(private service:LoginService) 
  { 
    this.loginService=service;
  }

  ngOnInit() {
    debugger
    this.loginService.logout();
  }

}
