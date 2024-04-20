import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USER_LOGIN, USER_LOGOUT, USER_PROFILE, USER_SIGNUP } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './cart.service';

const USER_KEY = "accessToken"
const USER_ID = "userId"
const CHECKOUT_DATA = "checkoutData"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(this.getProfile());
  public userObservable:Observable<any>;

  constructor(private http:HttpClient, private toastrServices:ToastrService, private cartService: CartService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<any>{
    return this.http.post<any>(USER_LOGIN, userLogin).pipe(
      tap({
        next: (user) => {
          // const clientId = user.metadata.shop._id;
          // const headers = new HttpHeaders().set('client-id', clientId);
          this.setUserToLocalStorage(user)
          localStorage.setItem(USER_ID, JSON.stringify(user.metadata.shop._id));
          this.getProfile();
          this.cartService.getCart();
          // this.userSubject.next(user);
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
          this.setUserToLocalStorageRegister(user)
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

  getProfile(): void{
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if (!accessToken || !clientId) {
      console.log("error token or clientId::");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    // const headers = new HttpHeaders()
    // .set('authorization', `Bearer ${accessToken}`)
    // .set('x-client-id', parseClientId);
    const headers = this.setHeaders(accessToken, parseClientId);

    this.http.get<any>( USER_PROFILE, { headers }).subscribe(
      (data) => {
        this.userSubject.next(data);
      },
      (error) => {
        // Xử lý lỗi nếu có
        console.error('Error fetching user profile:', error);
      }
    );
  }

  private setHeaders(accessToken: any, parseClientId: any){
      const headers = new HttpHeaders()
      .set('authorization', `Bearer ${accessToken}`)
      .set('x-client-id', parseClientId);
      return headers
  }

  private setUserToLocalStorageRegister(user: any){
    localStorage.setItem(USER_KEY, JSON.stringify(user.metadata.metadata.tokens.asscessToken));
  }

  private setUserToLocalStorage(user: any){
    localStorage.setItem(USER_KEY, JSON.stringify(user.metadata.tokens.asscessToken));
  }

  private getUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);   
        return user;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem(USER_KEY);
        return null; 
      }
    }
    return null;
  }


  logout(): Observable<any>{
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if (!accessToken || !clientId) {
      console.log("error token or clientId::");
      return throwError("Error: Access token or client ID not found");
    }
    const parseClientId = JSON.parse(clientId);
    const headers = this.setHeaders(accessToken, parseClientId);
    const logoutHttp = this.http.get<any>( USER_LOGOUT , { headers }).pipe(
      tap({
        next: () => {
          this.toastrServices.success(
            `LogoutSuccesFully!`,
          )
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(USER_ID);
          localStorage.removeItem(CHECKOUT_DATA);
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'out Failed!')
        }
      })
    )
    return logoutHttp;
  }
}