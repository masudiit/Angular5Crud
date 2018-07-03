import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../models/employee.model';

// video 47,48, 49
@Pipe({
    name: 'employeeFilter',
    pure: true // pure: true is by default
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchTerm: string): Employee[] {
     if (!employees || !searchTerm) {
         return employees;
     }
     return employees.filter(employee =>
        employee.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
    }
}
