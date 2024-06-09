import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_FINAL_SIGNUP, USER_FORGOTPASSWORD, USER_LOGIN, USER_LOGOUT, USER_PROFILE, USER_RESETPASSWORD, USER_SIGNUP } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { getUserFromLocalStorage, setHeaders, setUserToLocalStorage, setUserToLocalStorageRegister } from '../shared/auth/authen';

const USER_KEY = "accessToken"
const USER_ID = "userId"
const CHECKOUT_DATA = "checkoutData"
const CHECKOUT_ID = "checkoutId"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(this.getProfile());
  public userObservable:Observable<any>;

  constructor(
    private http:HttpClient, 
    private toastrServices:ToastrService, 
    private cartService: CartService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<any>{
    return this.http.post<any>(USER_LOGIN, userLogin).pipe(
      tap({
        next: (user) => {
          setUserToLocalStorage(user)
          localStorage.setItem(USER_ID, JSON.stringify(user.metadata.shop._id));
          this.getProfile();
          this.cartService.getCart();
          this.toastrServices.success(
            `Welcome to Foodmine ${user.metadata.shop.name}!`,
            'Login Successful'
          )
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Login Failed!')
        }
      })
    );
  }

  register(userRegister: any): Observable<any> {
    return this.http.post<any>(USER_SIGNUP, userRegister).pipe(
      tap({
        next: (user) => {
          this.toastrServices.success(
            `Check email!`,
            'Register comfirm'
          )
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Login Failed!')
        }
      })
    )
  }

  finalRegister(hashEmail: any): Observable<any>{
    const payload = {
      hashEmail
    }
    return this.http.post<any>(USER_FINAL_SIGNUP, payload).pipe(
      tap({
        next: (user) => {
          console.log("user::", user);
          
          setUserToLocalStorageRegister(user)
          localStorage.setItem(USER_ID, JSON.stringify(user.metadata.metadata.shop._id));
          this.getProfile();
          this.cartService.getCart();
          this.toastrServices.success(
            `Welcome to Foodmine ${user.metadata.metadata.shop.name}!`,
            'Register Successful'
          )
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Login Failed!')
        }
      })
    )
  }

  logout(): Observable<any>{
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if (!accessToken || !clientId) {
      console.log("error token or clientId::");
      return throwError("Error: Access token or client ID not found");
    }
    const parseClientId = JSON.parse(clientId);
    const headers = setHeaders(accessToken, parseClientId);
    const logoutHttp = this.http.get<any>( USER_LOGOUT , { headers }).pipe(
      tap({
        next: () => {
          this.toastrServices.success(
            `LogoutSuccesFully!`,
          )
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(USER_ID);
          localStorage.removeItem(CHECKOUT_DATA);
          localStorage.removeItem(CHECKOUT_ID);
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'out Failed!')
        }
      })
    )
    return logoutHttp;
  }

  forgotPassword(email: any): Observable<any>{
    return this.http.post<any>(USER_FORGOTPASSWORD, email).pipe(
      tap({
        next: (user) => {
          this.toastrServices.success(
            `Check your email for reset password!`,
            'Forgot Password'
          )
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Forgot Password Failed!')
        }
      })
    )
  }

  resetPassword(newPassword: any, paramsToken: any ): Observable<any>{
    const data = {
      newPassword,
      paramsToken
    }
    
    return this.http.post<any>(USER_RESETPASSWORD, data).pipe(
      tap({
        next: (user) => {
          this.toastrServices.success(
            `Create password succcfully, pls Login!`,
            'Reset Password'
          )
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Forgot Password Failed!')
        }
      })
    )
  }
  getProfile(): void{
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if (!accessToken || !clientId) {
      console.log("error token or clientId::");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    const headers = setHeaders(accessToken, parseClientId);

    this.http.get<any>( USER_PROFILE, { headers }).subscribe(
      (data) => {
        this.userSubject.next(data);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}