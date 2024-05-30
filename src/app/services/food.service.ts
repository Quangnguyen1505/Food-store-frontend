import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_ALL_TAG_URL, FOOD_SEARCH, FOOD_TAG, FOOD_UPDATE_FAVORITE, FOOD_URL, FOOD_URL_ID } from '../shared/constants/urls';

const USER_ID = "userId";
const USER_KEY = "accessToken";

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

  updateFavorite( foodId: any ): void{
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(!accessToken || !clientId) {
      console.log("error AT & CLID");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    const headers = this.setHeaders(accessToken, parseClientId);
    this.http.get<any>(FOOD_UPDATE_FAVORITE + foodId, {headers}).subscribe(
      (data) => {
        window.location.reload(); 
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  private setHeaders(accessToken: any, parseClientId: any): HttpHeaders {
    return new HttpHeaders()
      .set('authorization', `Bearer ${accessToken}`)
      .set('x-client-id', parseClientId);
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
}
