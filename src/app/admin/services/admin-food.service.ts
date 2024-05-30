import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AdminFoodService {

  constructor(private http: HttpClient) { }
  getAll(page: any): Observable<any>{    
    return this.http.get<any>(FOOD_URL +"?page=" + page);
  }
}
