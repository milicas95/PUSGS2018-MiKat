import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../Models/service.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  @Input() service:Service;

  constructor() { }

  ngOnInit() {
  }

}
