import { Component, Inject, OnInit } from '@angular/core';
import { AdminFoodService } from '../../services/admin-food.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent{
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private foodService:AdminFoodService, 
    private ref: MatDialogRef<DialogDeleteComponent>){}

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  submitDel(){
    const foodId = this.data.code;
    this.foodService.deleteFoodById(foodId).subscribe( ()=>{
      this.closepopup();
    });
  }
}
