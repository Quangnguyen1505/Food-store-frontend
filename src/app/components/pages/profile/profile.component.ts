import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  faTicket, faArrowRightFromBracket, faBell, faUser
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: any;
  faTicket = faTicket;
  faArrowRightFromBracket = faArrowRightFromBracket
  faBell = faBell;
  faUser = faUser;
  constructor( private userService: UserService){
    this.userService.userObservable.subscribe((newUser)=>{
      console.log("user", newUser);
      
      this.user = newUser.metadata;
    })
  }
}
