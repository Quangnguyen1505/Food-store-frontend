import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-passord',
  templateUrl: './forgot-passord.component.html',
  styleUrls: ['./forgot-passord.component.css']
})
export class ForgotPassordComponent implements OnInit{
  forgotPawordForm!: FormGroup;
  isSubmitted = false;
  returnURL = '';
  constructor(private formBuilder: FormBuilder
    , private userService: UserService
    , private activatedRoute:ActivatedRoute
    , private router:Router){}

  ngOnInit(): void {
    this.forgotPawordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL;
  }

  get fc(){
      return this.forgotPawordForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.forgotPawordForm.invalid) return;

    this.userService.forgotPassword({email: this.fc.email.value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnURL);
    });
  }
  
}
