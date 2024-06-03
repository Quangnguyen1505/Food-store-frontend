import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_UPDATE, FOOD_URL, FOOD_URL_ID } from '../shared/constants/urls';
import { getUserFromLocalStorage, setHeaders } from 'src/app/shared/auth/authen';

const USER_ID = "userId"

@Injectable({
  providedIn: 'root'
})
export class AdminFoodService {

  constructor(private http: HttpClient) { }
  getAll(page: any): Observable<any>{    
    return this.http.get<any>(FOOD_URL +"?page=" + page);
  }

  getFoodById(foodId: string):Observable<any>{
    return this.http.get<any>(FOOD_URL_ID + foodId);
  }

  SaveFood(foodId: any, payload: any): Observable<any>{
    let parseClientId;
    
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(FOOD_UPDATE + foodId, payload, {headers});
  }
}
