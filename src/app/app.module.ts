import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import FoodPageComponent from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { BannerComponent } from './components/partials/banner/banner.component';
import { ForgotPassordComponent } from './components/pages/forgot-passord/forgot-passord.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { OrderPageComponent } from './components/pages/order-page/order-page.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/partials/pagination/pagination.component';
import { ListItemFoodComponent } from './components/partials/list-item-food/list-item-food.component';
import { StateComponent } from './components/partials/state/state.component';
import { ManagerAccountComponent } from './components/pages/profile/manager-account/manager-account.component';
import { DiscountComponent } from './components/pages/profile/discount/discount.component';
import { AdminModule } from './admin/admin.module';
import { DialogRegisterComponent } from './components/partials/dialog-register/dialog-register.component';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

//enviroment
import { environment } from 'src/environments/environment';

//socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BodyEditUserComponent } from './components/partials/body-edit-user/body-edit-user.component';
import { ChangePasswordComponent } from './components/pages/profile/change-password/change-password.component';
const config: SocketIoConfig = { url: environment.envVar.endpointUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    ProfileComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    BannerComponent,
    ForgotPassordComponent,
    ResetPasswordComponent,
    OrderPageComponent,
    FooterComponent,
    PaginationComponent,
    ListItemFoodComponent,
    StateComponent,
    ManagerAccountComponent,
    DiscountComponent,
    DialogRegisterComponent,
    BodyEditUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 9000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
    FontAwesomeModule,
    AdminModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
