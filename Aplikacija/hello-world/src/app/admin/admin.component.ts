import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { ProfileService } from '../Services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private users:User[];

  constructor(private router:Router, private activatedRoute: ActivatedRoute) 
  { 

  }

  ngOnInit() {
    this.router.navigate(['/admin']);
  }

}
