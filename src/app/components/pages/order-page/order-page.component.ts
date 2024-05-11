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
  returnURL = '';
  limit: number = 4;
  currentPage: number = 1;
  total: any;
  paramsTag: any;
  constructor( 
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.route.queryParams.subscribe(params => {
        const page = params['page'];
        this.paramsTag = "/order";
        console.log("page: ", {page, params: this.paramsTag});
        
        this.checkoutService.getListOrder(page).subscribe((data) => {
          this.order = data?.metadata.orders;
          this.total = data?.metadata.totalCountOrder;
        })
      });
    })
        // this.checkoutService.checkoutObservable.subscribe((checkout) => {
        //   this.order = checkout?.metadata.orders;
        //   this.total = checkout?.metadata.totalCountOrder;
        //   console.log("order: ", this.total);
          
        // })
  }
  
  changePage(page: number): void {
    this.currentPage = page;
    console.log(this.currentPage);
    
  }
    
}
