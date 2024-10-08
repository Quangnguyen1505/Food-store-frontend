import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  faTicket, faArrowRightFromBracket, faBell, faUser, faKey
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
  faKey = faKey;
  constructor( private userService: UserService){
    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser?.metadata;
    })
  }
}
