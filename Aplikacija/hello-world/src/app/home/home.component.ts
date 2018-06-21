import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router:Router) {

   }

  ngOnInit() {
    this.router.navigate(['/service']);
  }

  isntLoggedOn()
  {
    //debugger
      return SessionService.isntLoggedOn();
  }

  isAdmin()
  {
    return SessionService.isAdmin();
  }

  isManager()
  {
    return SessionService.isManager();
  }

  isAppUser()
  {
    //debugger
    return SessionService.isAppUser();
  }
}
