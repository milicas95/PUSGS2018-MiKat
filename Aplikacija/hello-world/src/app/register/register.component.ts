import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../Services/register.service';
import { User } from '../Models/user.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  private clicked=false;
  private requierdName=false;
  private requierLastName=false;
  private requierdBirthday=false;
  private requierdEmail=false;
  private requierdPassword=false;
  private passwordLength=false;
  private requierdConfirmation=false;
  private samePassword=false;
  private registerUser:User;
  private registerService:RegisterService;

  constructor(private service:RegisterService, private router: Router) 
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
    this.requierdName=false;
    this.requierLastName=false;
    this.requierdBirthday=false;
    this.requierdEmail=false;
    this.requierdPassword=false;
    this.passwordLength=false;
    this.requierdConfirmation=false;
    this.samePassword=false;
    this.registerUser=user;
    if ( this.registerUser.Name == "")
    this.requierdName=true;
    if ( this.registerUser.LastName == "")
    this.requierLastName=true;
    if ( this.registerUser.Birthday == null)
    this.requierdBirthday=true;
    if ( this.registerUser.Email == "")
    this.requierdEmail=true;
    if ( this.registerUser.Password == "")
    this.requierdPassword=true;
    if ( this.registerUser.Confirmation == "")
    this.requierdConfirmation=true;
    if ( this.registerUser.Password.length < 6 )
    this.passwordLength=true;
    debugger
    if ( this.registerUser.Password != this.registerUser.Confirmation)
    this.samePassword=true;
    console.log(user);

    if(this.requierdName == false && this.requierLastName==false 
    && this.requierdBirthday==false && this.requierdEmail==false 
    && this.requierdPassword==false && this.requierdConfirmation==false 
    && this.passwordLength==false && this.samePassword==false)
    {
    this.registerService.postMethod(user); 
    this.router.navigate(['/login']);
    form.reset();
    
    }
  }
}
