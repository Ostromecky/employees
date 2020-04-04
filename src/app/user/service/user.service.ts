import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toHttpParams } from '../../shared/helpers/http.helper';
import { Query } from '../../shared/model/query.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(query: Query): Observable<User[]> {
    const params = toHttpParams(query);
    return this.http.get<User[]>(`${environment.apiUrl}/users`, {params});
  }
}
