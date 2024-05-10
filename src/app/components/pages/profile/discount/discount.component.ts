import { Component } from '@angular/core';
import { DiscountsService } from 'src/app/services/discounts.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent {
  discounts:any;
  constructor( private discountService: DiscountsService ){
    this.discountService.getListDiscount().subscribe((data) => {
      this.discounts = data?.metadata
    })
  }
}
