import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../Services/register.service';
import { User } from '../Models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  private clicked=false;
  private registerUser:User;
  private registerService:RegisterService;

  constructor(private service:RegisterService) 
  { 
    this.registerService=service;
  }

  ngOnInit() {
  }

  toggle():void
  {
    this.clicked=!this.clicked;
  }

  onSubmit(user:User,form:NgForm)
  {
    this.registerUser=user;
    console.log(user);
    this.registerService.postMethod(user);  // zasto mi izbaci gresku da postMetod ne postoji???
    form.reset();
  }
}
