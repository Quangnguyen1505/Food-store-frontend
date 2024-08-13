import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_CHANGEPASSWORD, USER_FINAL_SIGNUP, USER_FORGOTPASSWORD, USER_LOGIN, USER_LOGOUT, USER_PROFILE, USER_RESETPASSWORD, USER_SIGNUP } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { getUserFromLocalStorage, setHeaders, setUserToLocalStorage, setUserToLocalStorageRegister } from '../shared/auth/authen';
import { UPDATE_USER_URL, UPLOAD_AVATAR_URL } from '../admin/shared/constants/urls';

const USER_KEY = "accessToken";
const USER_ID = "userId";
const CHECKOUT_DATA = "checkoutData";
const CHECKOUT_ID = "checkoutId";
const CART_ID = "cartId"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  public userObservable: Observable<any>;
  user$ = this.userSubject.asObservable();
  private cartSubject = new BehaviorSubject<any>(null);
  
  constructor(
    private http: HttpClient, 
    private toastrServices: ToastrService, 
    private cartService: CartService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
    
    const accessToken = getUserFromLocalStorage();
    if(accessToken){
      this.getProfile();
    }
  }
  public get currentUser():any{
    return this.userSubject.value;
  }
  login(userLogin: IUserLogin): Observable<any> {
    return this.http.post<any>(USER_LOGIN, userLogin).pipe(
      tap({
        next: (user) => {
          setUserToLocalStorage(user);
          localStorage.setItem(USER_ID, JSON.stringify(user.metadata.shop._id));
          this.getProfile();
          // this.userSubject.next(user);
          this.cartService.getCart().subscribe((data) => {
            this.cartSubject.next(data);
          });
          this.toastrServices.success(
            `Welcome to Foodmine ${user.metadata.shop.name}!`,
            'Login Successful'
          );
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Login Failed!');
        }
      })
    );
  }


  register(userRegister: any): Observable<any> {
    return this.http.post<any>(USER_SIGNUP, userRegister).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrServices.success(`Check email!`, 'Register confirm');
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Register Failed!');
        }
      })
    );
  }

  finalRegister(hashEmail: any): Observable<any> {
    const payload = { hashEmail };
    return this.http.post<any>(USER_FINAL_SIGNUP, payload).pipe(
      tap({
        next: (user) => {
          setUserToLocalStorageRegister(user);
          localStorage.setItem(USER_ID, JSON.stringify(user.metadata.shop._id));
          this.getProfile();
          this.cartService.getCart();
          this.toastrServices.success(
            `Welcome to Foodmine ${user.metadata.shop.name}!`,
            'Register Successful'
          );
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Register Failed!');
        }
      })
    );
  }

  logout(): Observable<any> {
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if (!accessToken || !clientId) {
      console.log("Error: Access token or client ID not found");
      return throwError("Error: Access token or client ID not found");
    }
    const parseClientId = JSON.parse(clientId);
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.get<any>(USER_LOGOUT, { headers }).pipe(
      tap({
        next: () => {
          this.toastrServices.success('Logout Successfully!');
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(USER_ID);
          localStorage.removeItem(CHECKOUT_DATA);
          localStorage.removeItem(CHECKOUT_ID);
          localStorage.removeItem(CART_ID);
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Logout Failed!');
        }
      })
    );
  }

  forgotPassword(email: any): Observable<any> {
    return this.http.post<any>(USER_FORGOTPASSWORD, email).pipe(
      tap({
        next: () => {
          this.toastrServices.success('Check your email for reset password!', 'Forgot Password');
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Forgot Password Failed!');
        }
      })
    );
  }

  resetPassword(newPassword: any, paramsToken: any): Observable<any> {
    const data = { newPassword, paramsToken };
    return this.http.post<any>(USER_RESETPASSWORD, data).pipe(
      tap({
        next: () => {
          this.toastrServices.success('Create password successfully, please Login!', 'Reset Password');
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Reset Password Failed!');
        }
      })
    );
  }

  getProfile() {
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if (clientId !== null) {
      parseClientId = JSON.parse(clientId);
    }

    const headers = setHeaders(accessToken, parseClientId);
    
     this.http.get<any>(USER_PROFILE, { headers }).subscribe({
      next: (data) => {
        this.userSubject.next(data);
      },
      error: (e) => {
        console.error(e);
        
      }
    })
  }

  editUserAndUpload(userId: any, body: any, avatar_img: File | null): Observable<any> {
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const formData = new FormData();
    const headers = setHeaders(accessToken, parseClientId);
    const payload = {
      userId,
      body
    }
    if(avatar_img){
      formData.append('file', avatar_img, avatar_img.name);
      return this.http.post<any>(UPLOAD_AVATAR_URL, formData, {headers}).pipe(
        tap({
          next: (data)=>{
            console.log("data", data);
            
            body.avatarUrl = data.metadata.image_url;
            console.log("body", body);
            return this.editUser(payload, headers).subscribe();
            
          },
          error: (e) => {
            console.error(e);
          }
        })
      )
    }

    return this.editUser(payload, headers);
  }

  editUser(body: any, headers: any): Observable<any> {
    return this.http.post<any>(UPDATE_USER_URL, body, {headers}).pipe(
      tap({
        next: (data) => {
          this.userSubject.next(data);
          this.toastrServices.success('Edit user successfully!', 'Edit User');
        },
        error: (e) => {
          this.toastrServices.error(e, 'Edit User Failed!');
        }
      })
    );
  }

  changePassword(body: any): Observable<any> {
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(USER_CHANGEPASSWORD, body, {headers}).pipe(
      tap({
        next: () => {
          this.toastrServices.success('Change password successfully!', 'Change Password');
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(USER_ID);
          localStorage.removeItem(CHECKOUT_DATA);
          localStorage.removeItem(CHECKOUT_ID);
          localStorage.removeItem(CART_ID);
          this.userSubject.next(null);
        },
        error: (e) => {
          this.toastrServices.error(e.error.message, 'Change Password Failed!');
        }
      })
    );
  }

}
