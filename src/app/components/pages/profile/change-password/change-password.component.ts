import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  isSubmitted = false;
  constructor(
    private buildr: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.changePasswordForm = this.buildr.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassword: ['', [Validators.required]]
    }, {
      validators: PasswordsMatchValidator('newpassword', 'confirmpassword')
    });
  }

  get fc() {
    return this.changePasswordForm.controls;
  }
  submit(){
    this.isSubmitted = true;

    if(this.changePasswordForm.invalid){
      return;
    }

    return this.userService.changePassword({oldPassword: this.fc.oldpassword.value, newPassword: this.fc.newpassword.value}).subscribe((res)=>{
      this.router.navigateByUrl('/login');
    })
  }
}
