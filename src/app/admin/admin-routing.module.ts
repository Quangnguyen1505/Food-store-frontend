import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDiscountComponent } from './partials/admin-discount/admin-discount.component';
import { AdminFoodComponent } from './partials/admin-food/admin-food.component';
import { AdminNotificationComponent } from './partials/admin-notification/admin-notification.component';
import { AdminUserComponent } from './partials/admin-user/admin-user.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  { 
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'discount',
        component: AdminDiscountComponent,
      },
      {
        path: 'food',
        component: AdminFoodComponent,
      },
      {
        path: 'notification',
        component: AdminNotificationComponent,
      },
      {
        path: 'user',
        component: AdminUserComponent,
      },
      {
        path: 'user',
        component: AdminUserComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
