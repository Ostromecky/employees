import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { toHttpParams } from '../../shared/helpers/http.helper';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUsers(...query): Observable<User[]> {
    console.log('query', query);
    const params = toHttpParams({...query[0]});
    console.log('params', params);
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params});
  }
}
