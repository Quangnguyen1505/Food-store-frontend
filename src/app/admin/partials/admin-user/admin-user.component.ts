import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyUserComponent } from '../dialog-body-user/dialog-body-user.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit{
  dataSource!: any[];
  displayedColumns: string[] = ["id", "name", "email", "address", "status", "avatar", "action"];
  constructor( 
    private adminUserService: AdminUserService, 
    private matDiaLog: MatDialog){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.adminUserService.getAllUser().subscribe((data) => {
      console.log("data", data);
      this.dataSource = data?.metadata;
    });
  }

  addcustomer(){
    this.Openpopup(0, 'Add User',DialogBodyUserComponent);
  }

  openDialogEdit(code: any){
    this.Openpopup(code, 'Edit Customer', DialogBodyUserComponent)
  }

  openDialogDel(code: any){
    this.Openpopup(code, 'Delete Customer', DialogDeleteUserComponent)
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.matDiaLog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      console.log("kk",item)
      this.getAllUser();
    })
  }
}
