import { Component, EventEmitter, Output } from '@angular/core';
import { AdminFoodService } from '../../services/admin-food.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent {
  dataSource!: any[];
  totocalCount!: number;
  limit = 8;
  displayedColumns: string[] = ["id", "name", "price", "tag", "imageUrl", "cookTime", "action"];
  
  constructor(private foodService: AdminFoodService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
      this.foodService.getAll(1).subscribe((response) => {
        this.dataSource = response.metadata.foods;
        this.totocalCount = response.metadata.totalCount;
      });
  }

  onPageChange(event: PageEvent) {
    let page = event.pageSize
    
    this.foodService.getAll(page).subscribe((response) => {
      this.dataSource = response.metadata.foods;
      this.totocalCount = response.metadata.totalCount;
    });
  }

}
