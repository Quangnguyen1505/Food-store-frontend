import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminUserService } from '../../services/admin-user.service';

@Component({
  selector: 'app-dialog-body-user',
  templateUrl: './dialog-body-user.component.html',
  styleUrls: ['./dialog-body-user.component.css']
})
export class DialogBodyUserComponent {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  myform: FormGroup;
  checkEmail = false;
  avatarPreview: string | ArrayBuffer | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<DialogBodyUserComponent>,
              private buildr: FormBuilder,
              private adminUserService: AdminUserService) {
    this.myform = this.buildr.group({
      name: this.buildr.control(''),
      email: this.buildr.control(''),
      address: this.buildr.control(''),
      status: this.buildr.control(''),
      avatar: this.buildr.control('')
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log("input data::", this.inputdata);

    if (this.inputdata.code) {
      this.checkEmail = true;
      setTimeout(() => {
        this.setpopupdata(this.inputdata.code);
      });
    } else {
      this.myform.patchValue({
        name: '',
        email: '',
        address: '',
        status: '',
        avatar: ''
      });
    }
  }

  setpopupdata(code: any) {
    this.adminUserService.getCurrentUser(code).subscribe(item => {
      this.editdata = item.metadata;
      this.avatarPreview = this.editdata.avatarUrl;
      console.log("edit data:", this.editdata);

      this.myform.patchValue({
        name: this.editdata.name || '',
        email: this.editdata.email || '',
        address: this.editdata.address || '',
        status: this.editdata.status || '',
        avatar: this.editdata.avatar || '',
      });
    });
  }


  get fc() {
    return this.myform.controls;
  }

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  SaveUser() {
    if (this.inputdata.code === 0) {
      console.log("value insert::", this.myform.value);
      
      // this.adminUserService.createFood(this.myform.value).subscribe(res => {
      //   this.closepopup();
      // });
    } else {
      this.adminUserService.saveUser(this.inputdata.code, this.myform.value).subscribe(res => {
        this.closepopup();
      });
    }
  }
  onFileSelected(event: Event): void {
    let file;
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      file = fileInput.files[0];
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);

      this.myform.patchValue({ avatar: file.name });
    }
  }
}
