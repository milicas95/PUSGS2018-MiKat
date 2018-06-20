import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { NgForm } from '@angular/forms';
import { Password } from '../Models/password.model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [ProfileService]
})
export class PasswordComponent implements OnInit {

  private profileService:ProfileService
  private error:string;
  private err:string;

  constructor( private service:ProfileService) 
  { 
    this.profileService=service;
    this.error = "";
    this.err = "";
  }

  ngOnInit() {
  }

  onSubmit(password:Password,form:NgForm)
  {
    this.profileService.changePassword(password)
    .subscribe(
        data=>{ this.error = "Successfully changed password"},
        err=>
        {
          this.error=err.error.ModelState[""];
          this.err=err.error.ModelState["model.Confirmation"];
          console.log(err);
        }
      );
    form.reset();
  }

}
