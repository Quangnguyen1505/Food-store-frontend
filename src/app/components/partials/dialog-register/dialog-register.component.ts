import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css']
})
export class DialogRegisterComponent implements OnInit{
  formData: any;
  inputdata: any;
  code: any;
  returnURL = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private userService: UserService,
  private router:Router,
  private ref: MatDialogRef<DialogRegisterComponent>){ 
  }
  
  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closepopup():void {
    this.ref.close('Closed using function');
  }

  comfirmRegister(code: any){
    this.userService.finalRegister(code).subscribe(()=>{
      this.closepopup();
      this.router.navigateByUrl(this.returnURL);
    });
  }
}