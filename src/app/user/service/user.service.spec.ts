import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { User } from '../model/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve users from the API via GET', () => {
    const dummyUsers: User[] = [
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
    service.getUsers({}).subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });
    const request = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });
});
