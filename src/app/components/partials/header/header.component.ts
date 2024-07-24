import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { NotificationsService } from 'src/app/services/notifications.service';
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
  noti: any = [];
  notiLength: number = 0;
  constructor(
    private cartService: CartService, 
    public userService: UserService,
    public notificationService: NotificationsService,
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

    this.notificationService.notiObservable.subscribe((data) => {
      this.noti = data?.metadata;
      this.notiLength = this.noti?.length || 0;
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

  directionalNoti(code: any){
    if(code?.foodId){
      return this.router.navigateByUrl("/food/"+code?.foodId);
    }

    return this.router.navigateByUrl("/profile/discounts");
  }
}
