import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AdminMenubarComponent } from './components/admin-menubar/admin-menubar.component';
import { AdminUserComponent } from './partials/admin-user/admin-user.component';
import { AdminDiscountComponent } from './partials/admin-discount/admin-discount.component';
import { AdminFoodComponent } from './partials/admin-food/admin-food.component';
import { AdminNotificationComponent } from './partials/admin-notification/admin-notification.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AdminMenubarComponent,
    AdminUserComponent,
    AdminDiscountComponent,
    AdminFoodComponent,
    AdminNotificationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
