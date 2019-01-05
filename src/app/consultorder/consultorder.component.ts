import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { OrdersService } from '../order.service';

@Component({
  selector: 'app-consultorder',
  templateUrl: './consultorder.component.html',
  styleUrls: ['./consultorder.component.css']
})
export class ConsultOrderComponent implements OnInit {

  orders: Order[];

  constructor(private service: OrdersService) { }

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
