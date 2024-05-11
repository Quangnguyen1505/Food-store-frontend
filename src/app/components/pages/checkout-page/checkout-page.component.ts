import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { DiscountsService } from 'src/app/services/discounts.service';
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
  discounts: any;
  constructor( 
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private discountService: DiscountsService,
    private cartService: CartService
  ) {
    this.checkoutService.checkoutObservable.subscribe((checkout) => {
      this.checkoutReview = checkout;
      console.log("checkout: ", checkout);
      
      this.order =  checkout?.metadata.items_food || checkout?.metadata.orderCheckout.items_food;
      this.totalPrice = checkout?.metadata.total_price || checkout?.metadata.discount.totalAfterApplyDiscount;
    })

    this.discountService.getListDiscount().subscribe((data) => {
      this.discounts = data?.metadata
    })

    this.cartService.cartObservable.subscribe((cart)=>{
      this.cart = cart; 
    })
  }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((dataUser) => {
      console.log("dataUser: ", dataUser);
      
      this.user = dataUser;
      this.user_address = this.user?.metadata.address;
      this.checkoutForm = this.formBuilder.group({
        name: [this.user?.metadata.name, Validators.required],
        address: [this.user?.metadata.address, Validators.required],
        discount: '',
      })
      this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL;
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(order: any, discountCode: any){
    console.log("order: ", order);
    
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Creating Order', 'Invalid input'); 
      return;
    }
    console.log("discounts: ", this.discounts);
    
    this.checkoutService.orderByUser(order, discountCode, this.fc.address.value);
  }

  updateDiscount(optinvalue: any){
    console.log("optinvalue: ", optinvalue);
    console.log("checkoutReview: ", this.checkoutReview);
    
    this.checkoutService.addDiscount(this.cart?.metadata, optinvalue);
  }
}
