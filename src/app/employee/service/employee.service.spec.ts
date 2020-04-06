import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { Employee } from '../model/employee.model';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve employees from the API via GET', () => {
    const dummyEmployees: Employee[] = [
      {
        id: 1,
        firstname: 'Kamil',
        lastname: 'Sztos'
      },
      {
        id: 2,
        firstname: 'Adam',
        lastname: 'Mały'
      }
    ];
    service.getEmployees({}).subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(dummyEmployees);
    });
    const request = httpMock.expectOne(`${environment.apiUrl}/employees`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyEmployees);
  });
});
