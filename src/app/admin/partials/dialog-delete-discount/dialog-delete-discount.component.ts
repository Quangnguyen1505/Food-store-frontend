import { Component, Inject } from '@angular/core';
import { AdminDiscountService } from '../../services/admin-discount.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-discount',
  templateUrl: './dialog-delete-discount.component.html',
  styleUrls: ['./dialog-delete-discount.component.css']
})
export class DialogDeleteDiscountComponent {
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private adminDiscountService: AdminDiscountService, 
    private ref: MatDialogRef<DialogDeleteDiscountComponent>){}

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  submitDel(){
    const discountId = this.data.code;
    this.adminDiscountService.deleteDiscountById(discountId).subscribe( ()=>{
      this.closepopup();
    });
  }
}
