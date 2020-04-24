import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes: object[] = [
    {
      title: 'Dashboard',
      path: 'dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Employees',
      path: 'employees',
      icon: 'people'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
