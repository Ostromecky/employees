import { Observable, of } from 'rxjs';
import { Employee } from '../../model/employee.model';

export class EmployeeServiceSpy {
  getEmployees(): Observable<Employee[]> {
    const employeeList = new Array<Employee>();
    return of(employeeList);
  }
}
