import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Order } from '../model/Order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[];

  @Input() order: Order;

  constructor(
    private orderService: OrderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {

    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  delete(order: Order): void {
    this.orders = this.orders.filter(h => h !== order);
    this.orderService.deleteOrder(order).subscribe(() => window.location.reload());
  }

  goBack(): void {
    this.location.back();
  }

}
