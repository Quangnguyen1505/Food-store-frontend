import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminUserService } from 'src/app/admin/services/admin-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-body-edit-user',
  templateUrl: './body-edit-user.component.html',
  styleUrls: ['./body-edit-user.component.css']
})
export class BodyEditUserComponent {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  myform: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null;
  file_avatar: File | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<BodyEditUserComponent>,
              private buildr: FormBuilder,
              private userService: UserService) {
    this.myform = this.buildr.group({
      name: this.buildr.control(''),
      email: this.buildr.control(''),
      address: this.buildr.control(''),
      status: this.buildr.control('')
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log("input data::", this.inputdata);

    if (this.inputdata.code) {
      setTimeout(() => {
        this.setpopupdata(this.inputdata.code);
      });
    }
  }

  setpopupdata(code: any) {
    this.userService.userObservable.subscribe((newUser) => {
      this.editdata = newUser?.metadata?.shop || newUser?.metadata;
      this.avatarPreview = this.editdata.avatarUrl;

      this.myform.patchValue({
        name: this.editdata.name || '',
        email: this.editdata.email || '',
        address: this.editdata.address || ''
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
    this.userService.editUserAndUpload(this.inputdata.code, this.myform.value, this.file_avatar).subscribe(res => {
      this.closepopup();
    });
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.file_avatar = fileInput.files[0];
    }
    if (this.file_avatar) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(this.file_avatar);
    }
  }
}
