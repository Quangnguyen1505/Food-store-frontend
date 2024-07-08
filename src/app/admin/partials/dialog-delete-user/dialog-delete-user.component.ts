import { Component, Inject } from '@angular/core';
import { AdminUserService } from '../../services/admin-user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.css']
})
export class DialogDeleteUserComponent {
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private adminUserService: AdminUserService, 
    private ref: MatDialogRef<DialogDeleteUserComponent>){}

  closepopup(): void {
    this.ref.close('Closed using function');
  }

  submitDel(){
    const userId = this.data.code;
    this.adminUserService.deleteUserById(userId).subscribe( ()=>{
      this.closepopup();
    });
  }
}
