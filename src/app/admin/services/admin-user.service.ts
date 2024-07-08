import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CREATE_USER_URL, CURRENT_USER_URL, DELETE_USER_URL, UPDATE_USER_URL, UPLOAD_AVATAR_URL, USER_ALL_URL } from '../shared/constants/urls';
import { getUserFromLocalStorage, setHeaders } from 'src/app/shared/auth/authen';
import { ToastrService } from 'ngx-toastr';

const USER_ID = "userId";

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor( private http: HttpClient, private toastrServices: ToastrService) { }

  getAllUser(page: any): Observable<any>{
    return this.http.get<any>(USER_ALL_URL +'?page='+page);
  }

  getCurrentUser(code: any): Observable<any>{
    return this.http.get<any>(CURRENT_USER_URL + code );
  }

  createUser(body: any, avatar_img: File): Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const formData = new FormData();
    formData.append('file', avatar_img, avatar_img.name);
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(UPLOAD_AVATAR_URL, formData, {headers}).pipe(
      tap({
        next: (data)=>{          
          body.avatarUrl = data.metadata.image_url;
          body.password = "123";
          
          this.http.post<any>(CREATE_USER_URL, body, {headers}).subscribe({
              next: (data) => {
                console.log("data", data);
                
                this.toastrServices.success(
                  `Create User to Foodmine ${data}!`,
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

  saveUser(userId: any, body: any, avatar_img: File): Observable<any>{
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }

    const formData = new FormData();
    formData.append('file', avatar_img, avatar_img.name);
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.post<any>(UPLOAD_AVATAR_URL, formData, {headers}).pipe(
      tap({
        next: (data)=>{
          console.log("data", data);
          
          body.avatarUrl = data.metadata.image_url;
          const payload = {
            userId,
            body
          }
          
          this.http.post<any>(UPDATE_USER_URL, payload, {headers}).subscribe({
              next: (data) => {
                console.log("data", data);
                
                this.toastrServices.success(
                  `Edit User to Foodmine ${data}!`,
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

  deleteUserById(userId: any){
    let parseClientId;
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(clientId != null){
      parseClientId = JSON.parse(clientId);
    }
    const headers = setHeaders(accessToken, parseClientId);
    return this.http.get<any>( DELETE_USER_URL + userId, {headers});
  }
}
