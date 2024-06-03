import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminFoodService } from '../../services/admin-food.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit{
  inputdata: any;
  editdata: any;  
  myform: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private ref: MatDialogRef<DialogBodyComponent>, 
    private buildr: FormBuilder,
    private adminFoodService: AdminFoodService) {
      this.myform = this.buildr.group({
        name: this.buildr.control(''),
        price: this.buildr.control(''),
        tags: this.buildr.control(''),
        imageUrl: this.buildr.control(''),
        origins: this.buildr.control(''),
        cookTime: this.buildr.control(''),
        // status: this.buildr.control(true)
      });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log("input data::", this.inputdata);
    if(this.inputdata.code){
      setTimeout(() => {
        this.setpopupdata(this.inputdata.code)
      });
    }
  }

  setpopupdata(code: any) {
    this.adminFoodService.getFoodById(code).subscribe(item => {
      this.editdata = item.metadata;
      console.log("edit dataa", this.editdata );
      
      this.myform.setValue({
        name: this.editdata.name,
        price: this.editdata.price,
        tags: this.editdata.tags,
        imageUrl: this.editdata.imageUrl,
        origins: this.editdata.origins,
        cookTime: this.editdata.cookTime
        // status: this.editdata.status //them backend status tung food
      });
    });
  }


  closepopup():void {
    this.ref.close('Closed using function');
  }
  
  SaveFood() {
    console.log("value Food::", this.myform.value);
    
    this.adminFoodService.SaveFood(this.inputdata.code, this.myform.value).subscribe(res => {
      this.closepopup();
    });
  }
}
