import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { ProfileService } from '../Services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { Service } from 'src/app/Models/service.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [ ProfileService,ServiceService]
})
export class AdminUsersComponent implements OnInit {
  private users:User[];
  private managers:User[];
  private services:Service[];

  constructor(private service:ProfileService,private router:Router,private serviceService:ServiceService) { }

  ngOnInit() {
    this.users=[];
    this.managers=[];
    this.services=[];
    this.getUsers();
    this.getManagers();
    this.getServers();
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

  getServers()
  {
    this.serviceService.getServers()
    .subscribe(
      data=>
      {
        this.services=data;
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
    this.serviceService.ban(user);
    console.log("Manager has been banned");
  }

  approve(service:Service)
  {
    this.serviceService.approve(service);
    console.log("Service has been approved");
  }
}
