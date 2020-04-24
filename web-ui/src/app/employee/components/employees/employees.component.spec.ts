import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeServiceSpy } from '../../service/mock/employeeServiceSpy';
import { EmployeesComponent } from './employees.component';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let debugElement: DebugElement;
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
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should appear when data is empty', () => {
    const el = debugElement.query(By.css('div.empty')).nativeElement.textContent;
    expect(el).toContain('No data found');
  });
});
