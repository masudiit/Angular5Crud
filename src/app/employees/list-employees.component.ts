import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
//import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] ;
  filteredEmployees: Employee[];
  dataFromChild: Employee;

  private searchTermForPipe: string;

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string){
    this._searchTerm = value;
    this.filteredEmployees = this.filteredEmployeesData(value);
  }

 // employeeToDisplay: Employee;
 // private arrayIndex = 1;

 filteredEmployeesData(searchString: string): Employee[]
 {
  return this.employees.filter(employee =>
  employee.name.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
 }

/*
export class App implements OnInit{
  constructor(){
     //called first time before the ngOnInit()
  }

  ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges() 
  }
}
*/

/*
constructor( private _employeeService: EmployeeService,
  private _router: Router,
  private _route: ActivatedRoute)
*/

  constructor(private _router: Router,
              private _route: ActivatedRoute) {
              this.employees = this._route.snapshot.data['employeeList'];
              if (this._route.snapshot.queryParamMap.has('searchTerm')) {
                this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
              } else {
               this.filteredEmployees = this.employees;
             }
           }

  ngOnInit() {
   //this.employees = this._employeeService.getEmployees();
 /*
   this._employeeService
   .getEmployees()
   .subscribe( (empList) => {
     this.employees = empList;
    console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
    console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
    console.log(this._route.snapshot.paramMap.keys);
 
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
     this.filteredEmployees = this.employees;
   }

   } ,

   (error) => {
       const statusMessage = 'Problem with the service. Please try again.';
       console.error(statusMessage);
   });
*/
   // this.employeeToDisplay = this.employees[0];
  }







/*
  nextEmployee(): void {
     if (this.arrayIndex <= 2) {
       this.employeeToDisplay = this.employees[this.arrayIndex];
       this.arrayIndex++;
     } else {
       this. employeeToDisplay = this.employees[0];
       this.arrayIndex = 1;
     }
  }
*/

handleNotify(eventData: Employee) {
  this.dataFromChild = eventData;
}

onClick(employeeId: number) {
  // passing query parameter. its kind of optional parameter
this._router.navigate(['/employees', employeeId], {
   queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue'}
});
}

onDeleteNotification(id: number){
  const i = this.filteredEmployees.findIndex(e => +e.id === id);
  if ( i !== -1) {
      this.filteredEmployees.splice(i, 1);
  }
}

}
