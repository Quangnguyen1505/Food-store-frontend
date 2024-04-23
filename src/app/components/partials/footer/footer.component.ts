import { Component } from '@angular/core';
import {
  faCartShopping, faUser, faRightToBracket, faArrowRightFromBracket,
  faAddressBook, faPhone , faEnvelope
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faCartShopping = faCartShopping;
  faUser = faUser;
  faRightToBracket = faRightToBracket;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faAddressBook = faAddressBook;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
}
