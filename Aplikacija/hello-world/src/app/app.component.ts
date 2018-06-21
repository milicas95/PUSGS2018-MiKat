import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Rent a car';

  constructor(private router:Router) 
  {
    localStorage.clear();
    localStorage.setItem("role","null");
   }
  
}
