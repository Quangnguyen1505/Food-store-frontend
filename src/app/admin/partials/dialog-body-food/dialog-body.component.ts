import { Component, computed, Inject, OnInit, signal } from '@angular/core';
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
  myform: FormGroup;
  tagList!: String[];
  originList!: String[];
  foodImgPreview: string | ArrayBuffer | null = null;
  file_food: File | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<DialogBodyComponent>,
              private buildr: FormBuilder,
              private adminFoodService: AdminFoodService) {
    this.getAllTags();
    this.myform = this.buildr.group({
      name: this.buildr.control(''),
      price: this.buildr.control(''),
      tags: this.buildr.control(''),
      imageUrl: this.buildr.control(''),
      origins: this.buildr.control(''),
      cookTime: this.buildr.control('')
    });
    
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code) {
      setTimeout(() => {
        this.setpopupdata(this.inputdata.code);
      });
    } else {
      this.originList = ['VietNam', 'China', 'UK', 'italy', 'Japan'];
      this.myform.patchValue({
        name: '',
        price: '',
        imageUrl: '',
        tags: '',
        origins: '',
        cookTime: ''
      });
    }
  }

  setpopupdata(code: any) {
    this.adminFoodService.getFoodById(code).subscribe(item => {
      this.editdata = item?.metadata;
      this.originList = this.editdata.origins;
      this.foodImgPreview = this.editdata.imageUrl;

      this.myform.patchValue({
        name: this.editdata.name || '',
        price: this.editdata.price || '',
        imageUrl: this.editdata.imageUrl || '',
        tags: this.editdata.tags || '', 
        origins: this.editdata.origins || '',
        cookTime: this.editdata.cookTime || ''
      });
    });
  }
  get fc() {
    return this.myform.controls;
  }

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  SaveFood() {
    if(this.file_food){
      if (this.inputdata.code === 0) {
        this.adminFoodService.createFood(this.myform.value, this.file_food).subscribe(res => {
          this.closepopup();
        });
      } else {
          this.adminFoodService.SaveFood(this.inputdata.code, this.myform.value, this.file_food).subscribe(res => {
            this.closepopup();
          });
      }
    }
  }

  getAllTags() {
    this.adminFoodService.getAllTags().subscribe(data => {
      this.tagList = data?.metadata?.map( (item: any) => item.name );
    })
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.file_food = fileInput.files[0];
    }
    if (this.file_food) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.foodImgPreview = e.target.result;
      };
      reader.readAsDataURL(this.file_food);

      // this.myform.patchValue({ avatar: file.name });
    }
  }
}
