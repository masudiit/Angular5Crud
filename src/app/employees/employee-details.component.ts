import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id: number;
  // ActivatedRoute is used to get parameter from url
  constructor(private _route: ActivatedRoute,
              private _employeeService: EmployeeService,
              private _router: Router ) { }

  ngOnInit() {

    /* 1st example: this is previous version of angualr 5. Here, if we want to 
    move to next employee using same component then the url will change 
    but the value will not come, the reason behind this is the ngOnInit()
    runs once. 
    */
   
    /* 
   // this._route.snapshot.params['id'] will return string. 
   //to convert to number we use + sign before that
   // const id = +this._route.snapshot.params['id'];
   this._id = +this._route.snapshot.paramMap.get('id');
   this.employee = this._employeeService.getEmployee(this._id);
   */


   /* To resolve this problem we have to apply observable param which is
    angular 5 version. here we can move to next employee using same componet
    */

      this._route.paramMap.subscribe( params => {
            this._id = +params.get('id');
            this.employee = this._employeeService.getEmployee(this._id);
      });


  }

  viewNextEmployee()
  {
    if (this._id < 3 ) {
       this._id = this._id + 1;
    } else {
       this._id = 1 ;
    }
    this._router.navigate(['/employees', this._id], 
    {
      queryParamsHandling: 'preserve'
    });
  }

}
