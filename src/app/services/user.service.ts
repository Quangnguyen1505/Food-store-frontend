import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = "User"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrServices:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<any>{
    return this.http.post<any>(USER_LOGIN, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
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

  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;

    return new User();
  }
}
