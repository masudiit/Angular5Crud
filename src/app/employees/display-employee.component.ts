import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {

 @Input() employee: Employee;
 @Input() searchTerm: string;
 @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
 @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
confirmDelete = false;


 private selectedEmployeeId: string;

 constructor(private _route: ActivatedRoute,
             private _router: Router,
            private _employeeService: EmployeeService) {
 }

  ngOnInit() {
    this.selectedEmployeeId = this._route.snapshot.paramMap.get('id');
    console.log(this.selectedEmployeeId);
  }

  handleClick()
  {
   this.notify.emit(this.employee);
  }

   // This ngOnChanges keeps last value and current value.
   // It gets the value from @Input() employee
   // Video 34
   ngOnChanges(changes: SimpleChanges) {
    const previousEmployee = <Employee>changes.employee.previousValue;
    const currentEmployee = <Employee>changes.employee.currentValue;
    console.log(' Previous : ' + (previousEmployee ? previousEmployee.name : 'Null' ));
    console.log(' Current : ' + (currentEmployee ? currentEmployee.name : 'Null' ));
  }
  
  getEmployeeNameAndGender(): string {
     return this.employee.name + '  ' + this.employee.gender;
  }

  // Following code is alternative to ngOnchange . This methodology is called property setter
 // video 35
 /*
 @Input() employeeId: number;
  private _employee: Employee;
  @Input()
  set employee(val: Employee) {
   console.log('Previous : ' + (this._employee ? this._employee.name : 'Null'));
   console.log('Current : ' + val.name);
   this._employee = val;
  }
  get employee(): Employee {
   return this._employee;
  }
  */

 // video 36
  /*
  ngOnChanges(changes: SimpleChanges) {
   for (const propName of Object.keys(changes))
   {
     const change = changes[propName];
     const from = JSON.stringify(change.previousValue);
     const to = JSON.stringify(change.currentValue);
     console.log(propName + ' changed from ' + from + ' to ' + to);
   }
  }
*/

viewEmployee() {
this._router.navigate(
    ['/employees', this.employee.id], {
     queryParams: { 'searchTerm': this.searchTerm}
});
}


editEmployee(){
  this._router.navigate(['/edit', this.employee.id]);
}

deleteEmployee() {
  this._employeeService
  .deleteEmployee(+this.employee.id);
  this.notifyDelete.emit(+this.employee.id);
}

}
