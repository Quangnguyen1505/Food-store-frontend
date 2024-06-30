import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.css']
})
export class ManagerAccountComponent {
  user!: any;
  constructor( private userService: UserService){
    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser?.metadata?.shop || newUser?.metadata;
    })
  }
}
