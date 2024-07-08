import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DISCOUNT_CREATE_URL, DISCOUNT_DELETE_URL, DISCOUNT_UPDATE_URL, DISCOUNT_URL } from '../shared/constants/urls';
import { getUserFromLocalStorage, setHeaders } from 'src/app/shared/auth/authen';

const USER_ID = "userId";

@Injectable({
  providedIn: 'root'
})
export class AdminDiscountService {

  constructor(private http:HttpClient) { }

  getDiscounts(page: any): Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.get<any>(DISCOUNT_URL + '?page=' + page, {headers});
  }

  getOneDiscount(discountId: any):Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.get<any>(DISCOUNT_URL + '/' + discountId, {headers});
  }

  deleteDiscountById(discountId: any){
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.get<any>( DISCOUNT_DELETE_URL + discountId, {headers});
  }

  createDiscount(payload: any):Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(DISCOUNT_CREATE_URL, payload, {headers});
  }

  updateDiscount(discountId: any, payload: any):Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    const updatedPayload = { ...payload, discountId };
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(DISCOUNT_UPDATE_URL, updatedPayload, {headers});
  }
}
