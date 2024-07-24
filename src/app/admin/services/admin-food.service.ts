import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FOOD_DELETE, FOOD_TAG, FOOD_UPDATE, FOOD_URL, FOOD_URL_ID, UPLOAD_AVATAR_URL } from '../shared/constants/urls';
import { getUserFromLocalStorage, setHeaders } from 'src/app/shared/auth/authen';
import { ToastrService } from 'ngx-toastr';

const USER_ID = "userId"

@Injectable({
  providedIn: 'root'
})
export class AdminFoodService {

  constructor(private http: HttpClient, private toastrServices: ToastrService) {}
  getAll(page: any): Observable<any>{    
    return this.http.get<any>(FOOD_URL +"?page=" + page);
  }

  getFoodById(foodId: string):Observable<any>{
    return this.http.get<any>(FOOD_URL_ID + foodId);
  }

  SaveFood(foodId: any, body: any, file_food: File): Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const formData = new FormData();
    formData.append('file', file_food, file_food.name);
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(UPLOAD_AVATAR_URL, formData, {headers}).pipe(
      tap({
        next: (data)=>{     
          body.imageUrl = data.metadata.image_url;
          
          this.http.post<any>(FOOD_UPDATE + foodId, body, {headers}).subscribe({
              next: (data) => {
                this.toastrServices.success(
                  `Update to Foodmine ${data}!`,
                  'Success'
                );
                // this.closepopup();
              },
              error: (e) => {
                console.error(e);
                
              }
            })
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }

  createFood( payload: any, file_food: File ): Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const formData = new FormData();
    formData.append('file', file_food, file_food.name);
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(UPLOAD_AVATAR_URL, formData, {headers}).pipe(
      tap({
        next: (data)=>{     
          payload.imageUrl = data.metadata.image_url;
          
          return this.http.post<any>(FOOD_URL, payload, {headers}).subscribe({
              next: (data) => {
                this.toastrServices.success(
                  `Create food to Foodmine ${data}!`,
                  'Success'
                );
                // this.closepopup();
              },
              error: (e) => {
                console.error(e);
                
              }
            })
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }

  deleteFoodById(foodId: any){
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.get<any>(FOOD_DELETE + foodId, {headers});
  }

  getAllTags(): Observable<any>{
    return this.http.get<any>(FOOD_TAG);
  }
}
