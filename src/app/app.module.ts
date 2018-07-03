import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {SelectRequiredValidatorDirective} from './shared/shared-required-validator.directive' ;
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {ConfirmEqualValidator1Directive} from './shared/confirm-equal-validator1.directive';


import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailGuardService } from './employees/employee-details-guard.service';


const appRoutes: Routes = [
 { path: 'list',
   component: ListEmployeesComponent,
   resolve: {employeeList: EmployeeListResolverService}
  },
 {
   path: 'edit/:id' ,
   component: CreateEmployeeComponent,
   canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
 { path: 'employees/:id',
   component: EmployeeDetailsComponent,
   canActivate: [EmployeeDetailGuardService] },
 { path: '' , redirectTo: '/list', pathMatch: 'full' },
 { path: 'notfound' , component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    ConfirmEqualValidator1Directive,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
   // RouterModule.forRoot(appRoutes, { enableTracing: true}),
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    EmployeeService,
    CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolverService,
    EmployeeDetailGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
