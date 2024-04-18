import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CART_ADD, CART_QUANTITY, CART_URL } from '../shared/constants/urls';

const USER_KEY = "accessToken"
const USER_ID = "userId"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject = new BehaviorSubject<any>(null);
  public cartObservable: Observable<any>;

  constructor(private http: HttpClient) { 
    this.cartObservable = this.cartSubject.asObservable();
  }

  addToCart(food: Food): void {
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    
    if (!accessToken || !clientId) {
      // if (this.cart.items) {
      //   let cartItem = this.cart.items.find(item => item.food._id === food._id);
      //   if (cartItem) return;
      // } else {
      //   this.cart.items = [];
      // }
      // this.cart.items.push(new CartItem(food));
      // this.setCartToLocalStorage();
      console.log("error AT & CLID");
      return;
    } else {
      const parseClientId = JSON.parse(clientId);
      const data_cart = {
        userId: parseClientId,
        food: {
          foodId: food._id,
          quantity: 1,
          name: food.name,
          img: food.imageUrl,
          price: food.price
        }
      };
      const headers = this.setHeaders(accessToken, parseClientId);
  
      this.http.post<any>(CART_ADD, data_cart, { headers }).subscribe(
        (data) => {
          this.getCart();
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  changeQuantity(food: any, quantity: number): void {    
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(!accessToken || !clientId) {
      console.log("error AT & CLID");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    const headers = this.setHeaders(accessToken, parseClientId);
    
    const data = {
      userId: parseClientId,
      user_order_ids: [
        {
          item_foods: [
              {
                  quantity: quantity,
                  price: food.price,
                  old_quantity: food.quantity,
                  foodId: food.foodId
              }
          ]
      }
      ]
    };

    this.http.post<any>(CART_QUANTITY, data, { headers }).subscribe(
      (data) => {
        this.getCart();
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  getCart(): void {
    const accessToken = this.getUserFromLocalStorage();
    const clientId = localStorage.getItem(USER_ID);
    if(!accessToken || !clientId) {
      console.log("error AT & CLID");
      return;
    }
    const parseClientId = JSON.parse(clientId);
    const headers = this.setHeaders(accessToken, parseClientId);

    this.http.get<any>( CART_URL, { headers }).subscribe(
      (data) => {
        this.cartSubject.next(data);
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

  // removeFormCart(foodId: string): void {
  //   if (this.cart.items) {
  //     this.cart.items = this.cart.items.filter(item => item.food._id !== foodId);
  //     this.setCartToLocalStorage();
  //   }
  // }

  // changeQuantity(foodId: string, quantity: number): void {
  //   let cartItem = this.cart.items.find(item => item.food._id === foodId);
  //   if (cartItem) {
  //     cartItem.quantity = quantity;
  //     cartItem.price = quantity * cartItem.food.price;
  //     this.setCartToLocalStorage();
  //   }
  // }

  // clearCart(): void {
  //   this.cart = new Cart();
  //   this.setCartToLocalStorage();
  // }

  // getCartObservable(): Observable<Cart> {
  //   return this.cartSubject.asObservable();
  // }

  // private setCartToLocalStorage(): void {
  //   if (this.cart.items) {
  //     this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
  //     this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
  //     const cartJson = JSON.stringify(this.cart);
  //     localStorage.setItem('Cart', cartJson);
  //     this.cartSubject.next(this.cart);
  //   }
  // }

  // private getCartFromLocalStorage(): Cart {
  //   const cartJson = localStorage.getItem('Cart');
  //   return cartJson ? JSON.parse(cartJson) : new Cart();
  // }
}
