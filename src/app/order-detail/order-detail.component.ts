import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../model/Order';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../order.service';
import { ItemProduct } from '../model/ItemProduct';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  itens: ItemProduct[];

  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrder(id)
      .subscribe(order => {
        this.order = order;
        const id = +this.route.snapshot.paramMap.get('id');
        this.orderService.getOrderItens(id)
          .subscribe(itens => {
            this.itens = itens;
          });
      });
  }

  goBack(): void {
    this.location.back();
  }

}
