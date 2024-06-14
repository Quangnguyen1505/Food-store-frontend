import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { DialogRegisterComponent } from '../../partials/dialog-register/dialog-register.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  registerForm!: FormGroup;
  isSubmitted = false;
  returnURL = '';
  constructor(private formBuilder: FormBuilder
    , private userService: UserService
    , private activatedRoute:ActivatedRoute
    , private router:Router
    , private matDiaLog: MatDialog
    ){}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      comfirmPassword: ['', Validators.required]
    }, {
      validators: PasswordsMatchValidator('password', 'comfirmPassword')
    })

    this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL;
    console.log(this.returnURL);
  }

  get fc(){
  return this.registerForm.controls;
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.matDiaLog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
      }
    });
    // _popup.afterClosed().subscribe(item => {
    //   //this.loadcustomer();
    // })
  }



  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const formData = {
      name: this.fc.name.value,
      email: this.fc.email.value,
      address: this.fc.address.value,
      password: this.fc.password.value,
      confirmPassword: this.fc.comfirmPassword.value
    };

    this.userService.register({name: this.fc.name.value ,email: this.fc.email.value, address: this.fc.address.value ,password: this.fc.password.value, confirmPassword: this.fc.comfirmPassword.value }).subscribe(()=>{
      //this.router.navigateByUrl(this.returnURL);
      this.Openpopup(0, 'Cofirm Register', DialogRegisterComponent);
    });
    
  }
}
