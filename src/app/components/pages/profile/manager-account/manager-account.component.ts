import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BodyEditUserComponent } from 'src/app/components/partials/body-edit-user/body-edit-user.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.css']
})
export class ManagerAccountComponent {
  user!: any;
  constructor( 
    private userService: UserService,
    private matDiaLog: MatDialog
  ){
    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser?.metadata?.shop || newUser?.metadata;
    })
  }

  editInfo(){
    this.Openpopup(this.user._id, 'Edit Information', BodyEditUserComponent);
  }

  Openpopup(code: any, title: string, component:any) {
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
      this.userService.userObservable.subscribe((newUser)=>{
        this.user = newUser?.metadata?.shop || newUser?.metadata;
      })
    })
  }
}
