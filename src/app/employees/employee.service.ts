import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of' ;
import 'rxjs/add/operator/delay' ;



@Injectable()
export class EmployeeService {
    private listEmployees: Employee[] =
    [
      {
        id: '1',
        name: 'Mark',
        gender: 'Male',
        email: 'mark@gmail.com',
        phoneNumber: 23423423,
        contactPreference: 'Phone',
        dateOfBirth: new Date('10/25/1998'),
        department: 'IT',
        isActive: true,
        photoPath: 'assets/images/101.png'
        },
        {
          id: '2',
          name: 'Mary',
          gender: 'Female',
          email: 'mark@gmail.com',
          phoneNumber: 23423423,
          contactPreference: 'Phone',
          dateOfBirth: new Date('10/25/1998'),
          department: 'IT',
          isActive: true,
          photoPath: 'assets/images/104.png'
          },
          {
            id: '3',
            name: 'John',
            gender: 'Male',
            email: 'jon@gmail.com',
            phoneNumber: 23423423,
            contactPreference: 'Phone',
            dateOfBirth: new Date('10/25/1998'),
            department: 'IT',
            isActive: true,
            photoPath: 'assets/images/102.png'
            }
    ];


getEmployees(): Observable<Employee[]> {
    return Observable.of( this.listEmployees).delay(1000);
}

getEmployee(id: number): Employee {
    const data = this.listEmployees.find(e => +e.id === id);
    console.log(data);
    return data;
  }


save(employee: Employee) {
    if(employee.id === null) {
       const maxid =  this.listEmployees.reduce(function(e1,e2){
            return (e1.id > e2.id ) ? e1 : e2;
        }).id ;
        employee.id = maxid + 1; 
       this.listEmployees.push(employee);
    } else {
       const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
       this.listEmployees[foundIndex] = employee;     
    }
}

deleteEmployee(id: number) {
    const i = this.listEmployees.findIndex(e => +e.id === id);
   if ( i !== -1) {
       this.listEmployees.splice(i, 1);
    }
}

}