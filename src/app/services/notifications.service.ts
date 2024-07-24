import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NOTIFICATION_LIST_URL } from '../shared/constants/urls';
import { getUserFromLocalStorage } from '../shared/auth/authen';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notiSubject = new BehaviorSubject<any>(null);
  public notiObservable: Observable<any>;

  constructor(private http: HttpClient) { 
    this.notiObservable = this.notiSubject.asObservable();
    const accessToken = getUserFromLocalStorage();
    // if(accessToken){
      this.getAllNoti().subscribe((data) => {
        this.notiSubject.next(data);
      });
    // }
  }

  getAllNoti(): Observable<any>{
    return this.http.get<any>(NOTIFICATION_LIST_URL);
  }

}
