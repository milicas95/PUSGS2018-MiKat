import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { User } from '../Models/user.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  private clicked=false;
  private loginUser:User;
  private loginService:LoginService;

  constructor(private service:LoginService) 
  {   
    this.loginService=service;
  }

  ngOnInit() {
  }

  toggle():void
  {
    this.clicked=!this.clicked;
  }

  onSubmit(user:User,form:NgForm)
  {
    this.loginService.getToken(user);
    form.reset();
  }
}