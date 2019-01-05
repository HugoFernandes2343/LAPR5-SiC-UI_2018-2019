import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-order-dm',
  templateUrl: './consult-order-dm.component.html',
  styleUrls: ['./consult-order-dm.component.css']
})
export class ConsultOrderDmComponent implements OnInit {

  orders: Order[];

  constructor(private service: OrdersService, private router: Router) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.service.getOrders()
      .subscribe(orders => {
        this.orders = orders
      });
  }

  delete(order: Order): void {
    this.orders = this.orders.filter(h => h !== order);
    this.service.deleteOrder(order).subscribe();
  }


}
