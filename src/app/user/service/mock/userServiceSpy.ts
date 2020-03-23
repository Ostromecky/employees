import { Observable, of } from 'rxjs';
import { User } from '../../model/user.model';

export class UserServiceSpy {
  getUsers(): Observable<User[]> {
    const user = new User();
    return of([user]);
  }
}
