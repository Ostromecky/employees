import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'lastname'];
  data: User[] = [];
  data$: Observable<User[]>;
  resultsLength = 0;
  isLoadingResults = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.data$ = this.getUsersObservable();
  }

  private getUsersObservable(): Observable<User[]> {
    return merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getUsers(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize | 5,
            this.sort.active,
            this.sort.direction);
        }),
        map((data: User[]) => {
          this.resultsLength = data.length;
          this.isLoadingResults = false;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      );
  }

  private getUsers(page: number, limit: number, activeSort: string, order: SortDirection): Observable<User[]> {
    return this.userService.getUsers({page, limit, activeSort, order});
  }

}
