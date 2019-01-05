import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-consultorder',
  templateUrl: './consultorder.component.html',
  styleUrls: ['./consultorder.component.css']
})
export class ConsultOrderComponent implements OnInit {

  orders: Order[];

  constructor(private service: OrdersService, private router: Router, private userService: UsersService) { }

  ngOnInit() {
    if(this.userService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.getOrdersByUsername();
  }

  getOrdersByUsername(): void {
    this.service.getOrdersByUsername(this.userService.getUser().username)
      .subscribe(orders => {
        this.orders = orders
      });
  }

  delete(order: Order): void {
    this.orders = this.orders.filter(h => h !== order);
    this.service.deleteOrder(order).subscribe();
  }

  goBack(): void {
    this.router.navigate(['/Order',]);
  }

}
