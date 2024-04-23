import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity!: number;
  user!:any;
  constructor(
    cartService: CartService, 
    private userService: UserService, 
    private router:Router, private toastrServices:ToastrService
  ){
    cartService.cartObservable.subscribe((newCart) => {
      if(!newCart){
        this.cartQuantity = 0;
      }else{
        this.cartQuantity = newCart?.metadata.cart_foods.length;
      }
    })

    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })
  }

  logout(){
    this.userService.logout().subscribe(()=>{
      window.location.reload();
    });
  }
  get token(){
    return this.user.metadata.tokens.asscessToken;
  }

  getCheckoutId(){
    return localStorage.getItem('checkoutId');
  }

  checkOrder(){
    if(!this.getCheckoutId()){
      this.toastrServices.error('Pls add some food to cart', 'Order failed');
    }
  }

}