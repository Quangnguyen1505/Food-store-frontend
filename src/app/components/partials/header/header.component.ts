import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity = 0;
  user!:any;
  constructor(cartService: CartService, private userService: UserService, private router:Router){
    // cartService.getCartObservable().subscribe((newCart) => {
    //   this.cartQuantity = newCart.totalCount;
    // })

    userService.userObservable.subscribe((newUser)=>{
      console.log("new uswe", newUser);
      
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

}