import { Component } from '@angular/core';
import { SocketIoService } from './services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(socketIoService: SocketIoService){
    // socketIoService.listenForFoodCreated()
  }
  title = 'food-store';
}
