import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: any;

  constructor(private cartService: CartService){
    this.cartService.cartObservable.subscribe((cart)=>{
      this.cart = cart;    
    })
  }

  removeFromCart(cartItem: CartItem){
    /*this.cartService.removeFormCart(cartItem.food._id);*/
  }

  changeQuantity(cartItem: CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem, quantity);
  }
}
