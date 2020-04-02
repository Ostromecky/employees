import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { Query } from '../../../shared/model/query.model';
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
  form: FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initFilterForm();
    this.data$ = this.getUsersObservable();
  }

  private getUsersObservable(): Observable<User[]> {
    return combineLatest(
      (this.getFilterValue(), merge(this.sort.sortChange, this.paginator.page, this.getFilterValue()))
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        this.cdr.markForCheck();
        return this.getUsers({
          page: this.paginator.pageIndex + 1,
          limit: this.paginator.pageSize | 5,
          activeSort: this.sort.active,
          order: this.sort.direction,
          filter: this.form.value
        });
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

  private getUsers(query: Query): Observable<User[]> {
    return this.userService.getUsers(query);
  }

  private initFilterForm() {
    this.form = this.fb.group({
      firstname: '',
      lastname: ''
    });
  }

  private getFilterValue(): Observable<object> {
    return this.form.valueChanges.pipe(
      debounceTime(300),
      finalize(() => console.log('finished'))
    );
  }
}
