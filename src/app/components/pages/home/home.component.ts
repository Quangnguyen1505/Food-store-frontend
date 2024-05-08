import { Component, Input, OnInit } from '@angular/core';
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
  currentPage: number = 1;
  limit: number = 8;
  total: number = 0;
  paramsPay: number = 1;
  paramsTag:any;
  constructor( private foodServices:FoodService, private activatedRoute: ActivatedRoute, private route: ActivatedRoute){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        this.foodServices.getAllFoodsBySearchTerm(params.searchTerm).subscribe(
          response => {
            this.foods = response.metadata; 
            this.checkTerm = true;
          },
          error => {
            console.error('Lỗi khi lấy dữ liệu thức ăn:', error);
          }
        );
      }
      else if(params.tag){
        this.activatedRoute.queryParams.subscribe(queryParams => {
          let page: number;
          const pageQuery = queryParams['page'];
          this.paramsTag = "/tag/"+params.tag;
          if (pageQuery) {
            page = pageQuery;
          } else {
            page = 1;
          }
          
          this.foodServices.getAllFoodsByTag(params.tag, page).subscribe(
            response => {
              if(params.tag == "All"){
                this.foods = response.metadata.foods; 
                this.total = response.metadata.totalCount;  
              }else{
                this.foods = response.metadata.foundFood;     
                this.total = response.metadata.foundFood.length;  
              }        
              this.checkTerm = true;
            },
            error => {
              console.error('Error Foods:', error);
            }
          );
        });
      }
      else{
        this.route.queryParams.subscribe(params => {
          const page = params['page'];
          console.log("page: ", page);
          
          this.paramsTag = '';
          this.foodServices.getAll(page).subscribe(
            response => {
              this.foods = response.metadata.foods; 
              this.total = response.metadata.totalCount;
            },
            error => {
              console.error('Error Foods:', error);
            }
          );
        });
        
      }
    })
    
  }
  ngOnInit(): void {
    
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
