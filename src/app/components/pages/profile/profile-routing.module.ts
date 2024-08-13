import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerAccountComponent } from './manager-account/manager-account.component';
import { DiscountComponent } from './discount/discount.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
      path: '',
      component: ManagerAccountComponent,
    },
    {
      path: 'discounts',
      component: DiscountComponent
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }