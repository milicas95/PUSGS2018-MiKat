import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { ProfileService } from '../Services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [ ProfileService,ServiceService]
})
export class AdminUsersComponent implements OnInit {
  private users:User[];
  private managers:User[];
  constructor(private service:ProfileService,private router:Router,private serviceService:ServiceService) { }

  ngOnInit() {
    this.users=[];
    this.managers=[];
    this.getUsers();
    this.getManagers();
  }

  getUsers()
  {
    this.service.getUsers()
    .subscribe(
      data=>
      {
        this.users = data;
      },
      error=>
      {
        console.log(error);
      }
    )
  }

  getManagers()
  {
    this.service.getManagers()
    .subscribe(
      data=>
      {
        this.managers=data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  confirm(user:User)
  {
    this.serviceService.confirm(user);
    console.log("User has been confirmed");
  }

  ban(user:User)
  {

  }
}
