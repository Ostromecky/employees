import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeRoutingModule } from './employee-routing.module';


@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule {
}
