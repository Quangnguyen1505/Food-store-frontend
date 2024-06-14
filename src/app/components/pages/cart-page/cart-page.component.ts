import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: any;
  totalCount!: number;
  totalPrice!: number;

  constructor(private cartService: CartService, private checkoutService: CheckoutService ,private router: Router, private toastrServices:ToastrService){
    this.cartService.cartObservable.subscribe((cart)=>{
      this.cart = cart; 
    })
  }

  removeFromCart(cartItem: any){
    this.cartService.removeFormCart(cartItem).subscribe(() => {
      this.toastrServices.success(
        `Remove food item success!`,
        'Remove Successful'
      );
    })
  }

  changeQuantity(cartItem: CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem, quantity).subscribe(() => {
      this.toastrServices.success(
        `Change quantity item success!`,
        ' Successful'
      );
    })
  }

  checkOutReview(){
    this.checkoutService.checkOutReview(this.cart.metadata)  
    this.router.navigateByUrl('/checkout');
  }
}
