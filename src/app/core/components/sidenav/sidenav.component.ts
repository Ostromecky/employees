import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes: object[] = [
    {
      title: 'User',
      path: 'users',
      icon: 'delete'
    },
    {
      title: 'Dashboard',
      path: 'dashboard',
      icon: 'delete'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
