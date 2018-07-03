import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm ;

  panelTitle: string;
  gender = 'male';
  isActive = true;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' },
  ];

  previewPhoto = false;
  colorTheme = 'theme-dark-blue';

  dateOfBirth: Date = new Date(2018, 1, 30);
  datePickerConfig: Partial<BsDatepickerConfig>;

  employee: Employee;


  constructor(
    private _employeeService: EmployeeService, 
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: this.colorTheme,
        showWeekNumbers: false,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2019, 7, 30),
        dateInputFormat: 'DD/MM/YYYY'
      });

  }







  ngOnInit() {
    this._route.paramMap.subscribe( parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    } );
  }

  private getEmployee(id: number){
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: '',
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
       this.employee = Object.assign({}, this._employeeService.getEmployee(id));
    }
  }

  saveEmployee(empForm: NgForm): void {
    // console.log(newEmployee);
    // vide0 46: javascript object reference
    const _employee: Employee = Object.assign({}, this.employee);
    // We can omit newEmployee since employee is already bind to ui and compnent
    this._employeeService.save(_employee);

    // empForm.reset();
    // or this will reset form, will empty all field in form
     this.createEmployeeForm.reset();
    // or this is reset form by setting following value
    // this.createEmployeeForm.reset({
    //    name: 'TestName',
    //    contactPreference: 'Phone'
    // });
    this._router.navigate(['list']);
   // console.log(empForm.value);
  }


  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
