import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import {
  faHeart
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export default class FoodPageComponent {
  faHeart = faHeart;
  food!: Food;
  tag!: any;
  suggestedFoods!: any;
  constructor(activatedRoute: ActivatedRoute, private foodServices: FoodService,
   private cartServices:CartService, private router: Router)
   {
    activatedRoute.params.subscribe((params) => {
      if(params.id){ 
        foodServices.getFoodById(params.id).subscribe(respone => {
          this.food = respone.metadata;
          console.log("this is food page", this.food);
          foodServices.getAllFoodsByTag(respone.metadata.tags[0], 1).subscribe((response) => {
            this.suggestedFoods = response.metadata.foundFood;  
            this.tag = respone.metadata.tags[0];
          })
        })
      }
    })
  }

  addToCart(){
    this.cartServices.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  changeFavorite(foodId: any){
    console.log("change favorite click");
    
    this.foodServices.updateFavorite(foodId);
  };
}
