import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_ALL_TAG_URL, FOOD_SEARCH, FOOD_TAG, FOOD_URL, FOOD_URL_ID } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor( private http:HttpClient) { }

  getAll(page: any): Observable<any>{    
    return this.http.get<any>(FOOD_URL +"?page=" + page);
  }

  getAllFoodsBySearchTerm(searchTerm: string){
    return this.http.get<any>(FOOD_SEARCH + searchTerm);
  }

  getAllTags(): Observable<any>{
    return this.http.get<any>(FOOD_TAG);
  }

  getAllFoodsByTag(tag:string, page: number):Observable<any>{
    return tag === "All"?
     this.getAll(page):
     this.http.get<any>(FOOD_ALL_TAG_URL + tag);
  }

  getFoodById(foodId: string):Observable<any>{
    return this.http.get<any>(FOOD_URL_ID + foodId);
  }

}
