import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminDiscountService } from '../../services/admin-discount.service';

@Component({
  selector: 'app-dialog-body-discount',
  templateUrl: './dialog-body-discount.component.html',
  styleUrls: ['./dialog-body-discount.component.css']
})
export class DialogBodyDiscountComponent {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  myform: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<DialogBodyDiscountComponent>,
              private buildr: FormBuilder,
              private adminDiscountService: AdminDiscountService) {
    this.myform = this.buildr.group({
      discount_code: this.buildr.control(''),
      discount_name: this.buildr.control(''),
      discount_value: this.buildr.control(''),
      discount_start_date: this.buildr.control(''),
      discount_end_date: this.buildr.control(''),
      discount_count: this.buildr.control('')
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log("input data::", this.inputdata);

    if (this.inputdata.code) {
      setTimeout(() => {
        this.setpopupdata(this.inputdata.code);
      });
    } else {
      this.myform.patchValue({
        name: '',
        email: '',
        address: '',
        status: ''
      });
    }
  }

  setpopupdata(code: any) {
    this.adminDiscountService.getOneDiscount(code).subscribe(item => {
      this.editdata = item.metadata;
      console.log("edit data:", this.editdata);

      this.myform.patchValue({
        discount_code: this.editdata.discount_code || '',
        discount_name: this.editdata.discount_name || '',
        discount_value: this.editdata.discount_value || '',
        discount_start_date: this.editdata.discount_start_date || '',
        discount_end_date: this.editdata.discount_end_date || '',
        discount_count: this.editdata.discount_count || ''
      });
    });
  }


  get fc() {
    return this.myform.controls;
  }

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  SaveDiscount() {
    if (this.inputdata.code === 0) {
        this.adminDiscountService.createDiscount(this.myform.value).subscribe(res => {
          this.closepopup();
        });
    } else {
        this.adminDiscountService.updateDiscount(this.inputdata.code, this.myform.value).subscribe(res => {
          this.closepopup();
        });
    }
  }
 
}
