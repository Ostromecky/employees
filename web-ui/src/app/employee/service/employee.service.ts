import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { toHttpParams } from '../../shared/helpers/http.helper';
import { Query } from '../../shared/model/query.model';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(query: Query): Observable<Employee[]> {
    const params = toHttpParams(query);
    return this.http.get<Employee[]>(`${environment.apiUrl}/employees`, {params}).pipe(
      catchError(() => of([]))
    );
  }
}
