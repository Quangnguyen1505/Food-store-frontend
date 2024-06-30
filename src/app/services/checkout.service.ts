import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ORDER_BY_USER, ORDER_LIST, ORDER_REVIEW } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { getUserFromLocalStorage, setHeaders } from '../shared/auth/authen';

const USER_ID = "userId"
const CART_ID = "cartId"
const CHECKOUT_DATA = "checkoutData"
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutSubject = new BehaviorSubject<any>(this.retrieveCheckoutData());
  public checkoutObservable:Observable<any>;
  constructor( private http: HttpClient, private toastrServices:ToastrService, private router: Router ) {
    this.checkoutObservable = this.checkoutSubject.asObservable();
  }

  private retrieveCheckoutData(): any {
    const storedData = localStorage.getItem(CHECKOUT_DATA);
    return storedData ? JSON.parse(storedData) : null;
  }

  private saveCheckoutData(data: any): void {
    localStorage.setItem(CHECKOUT_DATA, JSON.stringify(data));
  }

  checkOutReview(cartItem: any, discount = null){
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(!accessToken || !clientId) {
      console.log("error AT & CLID");
      return;
    }

    const parseClientId = JSON.parse(clientId);
    const headers = setHeaders(accessToken, parseClientId);
    
    const foodsOrder = cartItem.cart_foods.map((item: any) => ({
      foodId: item.foodId,
      price: item.price,
      quantity: item.quantity,
      img: item.img
    }));

    

    const data = {
      userId: cartItem.cart_userId,
      cartId: cartItem._id,
      discount_code: discount,
      foods_order: foodsOrder
    }

    this.http.post<any>(ORDER_REVIEW, data, { headers }).subscribe(
      (data) => {
        localStorage.setItem(CART_ID, JSON.stringify(cartItem._id));
        this.saveCheckoutData(data);
        this.checkoutSubject.next(data);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  orderByUser(order: any, discountCode = null, user_address: string){
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    const cartId = localStorage.getItem(CART_ID);
    if(!accessToken || !clientId || !cartId) {
      console.log("error AT & CLID");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    const parseCartId = JSON.parse(cartId);
    
    const headers = setHeaders(accessToken, parseClientId);
    
    const foodsOrder = order.map((item: any) => ({
      foodId: item.foodId,
      price: item.price,
      quantity: item.quantity,
      img: item.img,
      name: item.name
    }));

    const data = {
      userId: parseClientId,
      cartId: parseCartId,
      user_address,
      discountCode,
      foods_order: foodsOrder
    }

    this.http.post<any>(ORDER_BY_USER, data, { headers }).subscribe(
      (data) => {
        this.checkoutSubject.next(data)
        this.toastrServices.success(
          `Order successfuly!`
        )
        localStorage.removeItem(CART_ID);
        localStorage.removeItem(CHECKOUT_DATA);
        this.router.navigateByUrl('/order');
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  getListOrder( page: any): Observable<any>{
    const accessToken = getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if ( !accessToken || !clientId ) {
      console.log("error token or clientId::");
      return new Observable<any>();
    }
    const parseClientId = JSON.parse(clientId);
    const headers = setHeaders(accessToken, parseClientId);

    return this.http.get<any>( ORDER_LIST +"?page=" + page, { headers });
  }

}
