import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit{
  order: any;
  cart!: any;
  totalPrice!: number;
  user!: any;
  name!: any;
  checkoutReview!: any;
  checkoutForm!: FormGroup;
  constructor( 
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.checkoutService.checkoutObservable.subscribe((checkout) => {
      this.checkoutReview = checkout;
      this.order =  checkout?.metadata.items_food;
      this.totalPrice = checkout?.metadata.total_price;
    })
  }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((dataUser) => {
      this.user = dataUser;
      this.name = this.user?.metadata.name;
    
      this.checkoutForm = this.formBuilder.group({
        name: [this.name, Validators.required]
      })
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.valid){
      this.toastrService.warning('Creating Order', 'Invalid input');
      return;
    }
    this.order.name = this.fc.name.value;
    console.log("this order", this.order);
  }
}
