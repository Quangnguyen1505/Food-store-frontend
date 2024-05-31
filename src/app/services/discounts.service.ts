import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DISCOUNT_URL } from '../shared/constants/urls';
import { getUserFromLocalStorage, setHeaders } from '../shared/auth/authen';

const USER_ID = "userId"

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor( private http: HttpClient ) { }

  getListDiscount(): Observable<any>{
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    
    if ( !accessToken || !clientId ) {
      console.log("error token or clientId::");
      return new Observable<any>();
    }
    const parseClientId = JSON.parse(clientId);
    const headers = setHeaders(accessToken, parseClientId);

    return this.http.get<any>( DISCOUNT_URL, { headers });
  }
}
