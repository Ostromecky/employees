import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeServiceSpy } from '../../service/mock/employeeServiceSpy';
import { EmployeesComponent } from './employees.component';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [
        MatSortModule,
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        {
          provide: EmployeeService,
          useClass: EmployeeServiceSpy
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
