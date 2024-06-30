import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminFoodService } from '../../services/admin-food.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  arrTags: any = [];
  tagtemp = true;
  myform: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<DialogBodyComponent>,
              private buildr: FormBuilder,
              private adminFoodService: AdminFoodService) {
    this.myform = this.buildr.group({
      name: this.buildr.control(''),
      price: this.buildr.control(''),
      tags: this.buildr.array([]),
      imageUrl: this.buildr.control(''),
      origins: this.buildr.control(''),
      cookTime: this.buildr.control('')
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log("input data::", this.inputdata);

    if (this.inputdata.code) {
      this.tagtemp = false;
      setTimeout(() => {
        this.setpopupdata(this.inputdata.code);
      });
    } else {
      this.arrTags = ['all', 'kaka', 'heh'].map(tag => ({ value: tag }));
      this.setInitialTags(['all', 'kaka', 'heh']);
      this.myform.patchValue({
        name: '',
        price: '',
        imageUrl: '',
        origins: '',
        cookTime: ''
      });
    }
  }

  setpopupdata(code: any) {
    this.adminFoodService.getFoodById(code).subscribe(item => {
      this.editdata = item.metadata;
      console.log("edit data:", this.editdata);

      this.myform.patchValue({
        name: this.editdata.name || '',
        price: this.editdata.price || '',
        imageUrl: this.editdata.imageUrl || '',
        origins: this.editdata.origins || '',
        cookTime: this.editdata.cookTime || ''
      });

      // this.arrTags = this.editdata.tags.map((tag: any) => ({ value: tag }));
      // this.setInitialTags(this.editdata.tags || []);
    });
  }

  setInitialTags(tags: string[]): void {
    const tagsFormArray = this.myform.get('tags') as FormArray;
    tagsFormArray.clear();
    tags.forEach(tag => tagsFormArray.push(new FormControl(tag)));
  }

  get tagsArray() {
    return (this.myform.get('tags') as FormArray).controls;
  }

  get fc() {
    return this.myform.controls;
  }

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  SaveFood() {
    console.log("value Food:", this.inputdata.code);
    if (this.inputdata.code === 0) {
      this.adminFoodService.createFood(this.myform.value).subscribe(res => {
        this.closepopup();
      });
    } else {
      this.adminFoodService.SaveFood(this.inputdata.code, this.myform.value).subscribe(res => {
        this.closepopup();
      });
    }
  }
}
