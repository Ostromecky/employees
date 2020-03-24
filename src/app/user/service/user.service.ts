import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUsers(page: number, limit: number, activeSort: string, order: SortDirection): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?_page=${page}&_limit=${limit}&_sort=${activeSort}&_order=${order}`);
  }
}
