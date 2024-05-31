import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetPawordForm!: FormGroup;
  isSubmitted = false;
  paramsToken!: any;
  returnURL = '';
  constructor(private formBuilder: FormBuilder
    , private userService: UserService
    , private activatedRoute:ActivatedRoute
    , private router:Router){
      activatedRoute.params.subscribe((params) => {
        if(params.resetToken){
          this.paramsToken = params.resetToken;
        }
      });
    }

  ngOnInit(): void {
    this.resetPawordForm = this.formBuilder.group({
      newPassword: ['', Validators.required]
    })

    this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL;
  }

  get fc(){
      return this.resetPawordForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.resetPawordForm.invalid) return;
    const newPasword = this.fc.newPassword.value;
    const resetToken = this.paramsToken;
    this.userService.resetPassword(newPasword, resetToken).subscribe(()=>{
      this.router.navigateByUrl(this.returnURL);
    });
  }
}
