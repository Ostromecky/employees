import { Component, OnInit } from '@angular/core';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes: any[] = [
    {
      title: 'User',
      path: '/users',
      icon: 'delete'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
