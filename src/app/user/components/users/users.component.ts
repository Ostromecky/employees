import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, startWith, switchMap } from 'rxjs/operators';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['firstname', 'lastname'];
  data: User[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();
  resultsLength = 0;
  isLoadingResults = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (this.sort) {
      this.sort.sortChange.pipe(
        first(),
      ).subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.getUsers(
              this.paginator.pageIndex,
              5,
              this.sort.active,
              this.sort.direction);
          }),
          map((data: User[]) => {
            // Flip flag to show that loading has finished.
            this.resultsLength = data.length;
            this.isLoadingResults = false;
            return data;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            return of([]);
          })
        ).subscribe(data => {
        this.data = data;
        console.log('fine', this.isLoadingResults);
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getUsers(page: number, limit: number, activeSort: string, order: SortDirection): Observable<User[]> {
    return this.userService.getUsers(page, limit, activeSort, order);
  }

}
