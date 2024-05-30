import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import FoodPageComponent from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ForgotPassordComponent } from './components/pages/forgot-passord/forgot-passord.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { OrderPageComponent } from './components/pages/order-page/order-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'tag/:tag', component: HomeComponent},
  {path: 'food/:id', component: FoodPageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'profile', component: ProfileComponent,
    loadChildren: () => import('./components/pages/profile/profile-routing.module')
    .then(m => m.ProfileRoutingModule)
  },
  {path: 'checkout', component: CheckoutPageComponent},
  {path: 'order', component: OrderPageComponent},
  {path: 'forgot-password', component: ForgotPassordComponent},
  {path: 'reset-password/:resetToken', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
