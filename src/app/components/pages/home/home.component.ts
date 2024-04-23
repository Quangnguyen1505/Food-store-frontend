import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];
  checkTerm: boolean = false;

  constructor( private foodServices:FoodService,  activatedRoute: ActivatedRoute){
    // let foodsObservalbe:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      // if(params.searchTerm)
      // foodsObservalbe = this.foodServices.getAllFoodsBySearchTerm(params.searchTerm);
      // else if(params.tag)
      // foodsObservalbe = this.foodServices.getAllFoodsByTag(params.tag);
      // else
      if(params.searchTerm){
        this.foodServices.getAllFoodsBySearchTerm(params.searchTerm).subscribe(
          response => {
            this.foods = response.metadata; // Lấy dữ liệu từ trường metadata
            this.checkTerm = true;
          },
          error => {
            console.error('Lỗi khi lấy dữ liệu thức ăn:', error);
          }
        );
      }
      else if(params.tag){
        this.foodServices.getAllFoodsByTag(params.tag).subscribe(
          response => {
            this.foods = response.metadata; // Lấy dữ liệu từ trường metadata
            this.checkTerm = true;
          },
          error => {
            console.error('Lỗi khi lấy dữ liệu thức ăn:', error);
          }
        );
      }
      else{
        this.foodServices.getAll().subscribe(
          response => {
            this.foods = response.metadata; // Lấy dữ liệu từ trường metadata
            
          },
          error => {
            console.error('Lỗi khi lấy dữ liệu thức ăn:', error);
          }
        );
      }

      // foodsObservalbe.subscribe((serverFoods) => {
      //   this.foods = serverFoods;
      // })
    })
    
  }
  ngOnInit(): void {
    
  }
}
