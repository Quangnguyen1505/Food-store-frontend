import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DISCOUNT_URL } from '../shared/constants/urls';

const USER_KEY = "accessToken"
const USER_ID = "userId"

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor( private http: HttpClient ) { }

  getListDiscount(): Observable<any>{
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    
    if ( !accessToken || !clientId ) {
      console.log("error token or clientId::");
      return new Observable<any>();
    }
    const parseClientId = JSON.parse(clientId);
    const headers = this.setHeaders(accessToken, parseClientId);

    return this.http.get<any>( DISCOUNT_URL, { headers });
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

  private setHeaders(accessToken: any, parseClientId: any): HttpHeaders {
    return new HttpHeaders()
      .set('authorization', `Bearer ${accessToken}`)
      .set('x-client-id', parseClientId);
  }
}
