import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor( 
    private socket: Socket, 
    private toastrService: ToastrService, 
    private router: Router,
    notificationService: NotificationsService
  ) { 
    this.listenForFoodCreated(); 
    this.listenForDiscountCreated();
  }

  listenForFoodCreated() :void {
    this.socket.on('foodCreated', (data: any) => {
      this.showHTMLMessage(
        `<h3 id="foodNotification" style="cursor: pointer;">The store has a new item !!</h3>`,
        "Notification",
        data.noti_options.foodId
      );
    });
  }

  listenForDiscountCreated() :void {
    this.socket.on('discountCreated', (data: any) => {
      this.showHTMLMessage(
        `<h3 id="foodNotification" style="cursor: pointer;">The store has a new discount !!</h3>`,
        "Notification",
        data.noti_options.discountId
      );
    });
  }

  showHTMLMessage(message: string, title: string, code: any){
    const toast = this.toastrService.info(message, title, {
      enableHtml: true
    });

    if (toast) {
      toast.onTap.subscribe(() => {
        if(code?.foodId){
          return this.router.navigate(['/food', code]);
        }
        return this.router.navigateByUrl("/profile/discounts");
      });
    }
  }
}
