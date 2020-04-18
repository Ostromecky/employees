import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Query } from '../../../shared/model/query.model';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname'];
  data$: Observable<Employee[]>;
  resultsLength = 0;
  isLoadingResults = false;
  form: FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initFilterForm();
    this.data$ = this.getEmployeesObservable();
  }

  private getEmployeesObservable(): Observable<Employee[]> {
    return combineLatest((
      this.getFilterValue(), merge(this.sort.sortChange, this.paginator.page, this.getFilterValue())
    )).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        this.cdr.markForCheck();
        return this.getEmployees({
          page: this.paginator.pageIndex + 1,
          limit: this.paginator.pageSize | 5,
          sort: this.sort.active,
          order: this.sort.direction,
          filter: this.form.value
        });
      }),
      map((data: Employee[]) => {
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

  private getEmployees(query: Query): Observable<Employee[]> {
    return this.employeeService.getEmployees(query);
  }

  private initFilterForm() {
    this.form = this.fb.group({
      firstname: '',
      lastname: ''
    });
  }

  private getFilterValue(): Observable<object> {
    return this.form.valueChanges.pipe(
      debounceTime(300)
    );
  }
}
