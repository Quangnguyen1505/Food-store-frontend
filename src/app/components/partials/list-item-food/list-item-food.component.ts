import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-item-food',
  templateUrl: './list-item-food.component.html',
  styleUrls: ['./list-item-food.component.css']
})
export class ListItemFoodComponent{
  @Input()
  foods: any;
  @Input()
  foodId: any;
}
