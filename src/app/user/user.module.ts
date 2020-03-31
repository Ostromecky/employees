import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
