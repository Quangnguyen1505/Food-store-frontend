import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CART_URL, ORDER_REVIEW } from '../shared/constants/urls';

const USER_KEY = "accessToken"
const USER_ID = "userId"

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutSubject = new BehaviorSubject<any>(this.retrieveCheckoutData());
  public checkoutObservable:Observable<any>;
  constructor( private http: HttpClient ) {
    this.checkoutObservable = this.checkoutSubject.asObservable();
  }

  private retrieveCheckoutData(): any {
    const storedData = localStorage.getItem('checkoutData');
    return storedData ? JSON.parse(storedData) : null;
  }

  private saveCheckoutData(data: any): void {
    localStorage.setItem('checkoutData', JSON.stringify(data));
  }
  checkOutReview(cartItem: any){
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(!accessToken || !clientId) {
      console.log("error AT & CLID");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    const headers = this.setHeaders(accessToken, parseClientId);
    
    const foodsOrder = cartItem.cart_foods.map((item: any) => ({
      foodId: item.foodId,
      price: item.price,
      quantity: item.quantity
    }));

    

    const data = {
      userId: cartItem.cart_userId,
      cartId: cartItem._id,
      foods_order: foodsOrder
    }

    this.http.post<any>(ORDER_REVIEW, data, { headers }).subscribe(
      (data) => {
        this.saveCheckoutData(data);
        this.checkoutSubject.next(data)
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
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
