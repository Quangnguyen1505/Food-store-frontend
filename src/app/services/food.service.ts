import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_ALL_TAG_URL, FOOD_SEARCH, FOOD_TAG, FOOD_URL, FOOD_URL_ID } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor( private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get<any>(FOOD_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string){
    // return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return this.http.get<any>(FOOD_SEARCH + searchTerm);
  }

  getAllTags(): Observable<any>{
    return this.http.get<any>(FOOD_TAG);
  }

  getAllFoodsByTag(tag:string):Observable<any>{
    return tag === "All"?
     this.getAll():
     this.http.get<any>(FOOD_ALL_TAG_URL + tag);
  }

  getFoodById(foodId: string):Observable<any>{
    // return this.getAll().find(food => food.id == foodId) ?? new Food();
    return this.http.get<any>(FOOD_URL_ID + foodId);
  }

}
