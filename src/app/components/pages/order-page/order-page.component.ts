import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  order: any;
  user: any;
  totalPrice!: number;
  paramsId!: any;
  returnURL = '';
  constructor( 
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute:ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      if(params.id){
        this.paramsId = params.id;
        this.checkoutService.getListOrder(this.paramsId);
        this.checkoutService.checkoutObservable.subscribe((checkout) => {
          for (let i = 0; i < checkout?.metadata.length; i++) {
              this.order = checkout?.metadata[i].order_products;
              this.user = checkout?.metadata[i].order_userId;
              this.totalPrice = checkout?.metadata[i].order_checkout;
          }
        })
      }
    });

    
  }
    
}
