import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: any;
  constructor( private userService: UserService){
    userService.userObservable.subscribe((newUser)=>{
      console.log("user", newUser);
      
      this.user = newUser.metadata;
    })
  }
}
