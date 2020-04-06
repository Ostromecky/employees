import { Observable, of } from 'rxjs';
import { Employee } from '../../model/employee.model';

export class EmployeeServiceSpy {
  getEmployees(): Observable<Employee[]> {
    const employee = new Employee();
    return of([employee]);
  }
}
