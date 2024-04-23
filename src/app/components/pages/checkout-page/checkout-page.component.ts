import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserService } from 'src/app/services/user.service';

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
  user_address!: string;
  checkoutReview!: any;
  checkoutForm!: FormGroup;
  returnURL = '';
  constructor( 
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute
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
      this.user_address = this.user?.metadata.address;
      this.checkoutForm = this.formBuilder.group({
        name: [this.user?.metadata.name, Validators.required],
        address: [this.user?.metadata.address, Validators.required]
      })
      this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL;
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(order: any, user_address: string){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Creating Order', 'Invalid input'); 
      return;
    }

    this.checkoutService.orderByUser(order, user_address);
  }
}
