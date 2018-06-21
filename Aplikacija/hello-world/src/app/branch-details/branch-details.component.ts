import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/Models/service.model';
import { ServiceService } from 'src/app/Services/service.service';
import { Branch } from 'src/app/Models/branch.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css'],
  providers: [ServiceService]
})
export class BranchDetailsComponent implements OnInit {

  @Input() branch:Branch;

  constructor(private serviceService:ServiceService,private router:Router) { }

  ngOnInit() {
  }

  deleteBranch()
  {
    debugger
    this.serviceService.deleteBranchesMethod(this.branch.Id);
    console.log("Branch has been deleted");
    this.router.navigate(['/manager']);
  }
}
