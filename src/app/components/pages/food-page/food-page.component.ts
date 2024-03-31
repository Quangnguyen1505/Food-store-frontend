import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!: Food;
  constructor(activatedRoute: ActivatedRoute, foodServices: FoodService,
   private cartServices:CartService, private router: Router)
   {
    activatedRoute.params.subscribe((params) => {
      console.log("as",params.id);
      
      if(params.id){ foodServices.getFoodById(params.id).subscribe(respone => {
        this.food = respone.metadata;
      })
      }
    })
  }

  // addToCart(){
  //   this.cartServices.addToCart(this.food);
  //   this.router.navigateByUrl('/cart-page');
  // }
}
