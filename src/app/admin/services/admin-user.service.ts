import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CURRENT_USER_URL, UPDATE_USER_URL, USER_ALL_URL } from '../shared/constants/urls';
import { getUserFromLocalStorage, setHeaders } from 'src/app/shared/auth/authen';
const USER_ID = "userId";

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor( private http: HttpClient ) { }

  getAllUser(): Observable<any>{
    return this.http.get<any>(USER_ALL_URL);
  }

  getCurrentUser(code: any): Observable<any>{
    return this.http.get<any>(CURRENT_USER_URL + code );
  }

  saveUser(userId: any, body: any): Observable<any>{
    let parseClientId;
    
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const payload = {
      userId,
      body
    }
    
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(UPDATE_USER_URL, payload, {headers});
  }
}
