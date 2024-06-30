import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMenubarComponent } from './components/admin-menubar/admin-menubar.component';
import { AdminUserComponent } from './partials/admin-user/admin-user.component';
import { AdminDiscountComponent } from './partials/admin-discount/admin-discount.component';
import { AdminFoodComponent } from './partials/admin-food/admin-food.component';
import { AdminNotificationComponent } from './partials/admin-notification/admin-notification.component';
import { DialogBodyComponent } from './partials/dialog-body-food/dialog-body.component';
import { DialogDeleteComponent } from './partials/dialog-delete-food/dialog-delete.component';
import { DialogBodyUserComponent } from './partials/dialog-body-user/dialog-body-user.component';
import { DialogDeleteUserComponent } from './partials/dialog-delete-user/dialog-delete-user.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminMenubarComponent,
    AdminUserComponent,
    AdminDiscountComponent,
    AdminFoodComponent,
    AdminNotificationComponent,
    DialogBodyComponent,
    DialogDeleteComponent,
    DialogBodyUserComponent,
    DialogDeleteUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
