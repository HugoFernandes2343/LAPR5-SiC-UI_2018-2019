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
    this.displayList();
  }

  displayList(): void {

    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  goBack(): void {
    this.location.back();
  }

}
