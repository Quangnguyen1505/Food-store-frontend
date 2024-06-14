import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  user: any = {};
  checkRole: boolean = false;

  constructor(
    private cartService: CartService, 
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartObservable.subscribe((newCart) => {
      this.cartQuantity = newCart?.metadata?.cart_foods.length || 0;
    });

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser?.metadata?.shop || newUser?.metadata;
      if(this.user?.roles[0] == "ADMIN"){
        this.checkRole = true;
      }
    });
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }

  get token() {
    return this.user?.metadata?.tokens?.accessToken || '';
  }
}
