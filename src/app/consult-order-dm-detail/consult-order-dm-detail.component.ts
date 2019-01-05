import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-order-dm-detail',
  templateUrl: './consult-order-dm-detail.component.html',
  styleUrls: ['./consult-order-dm-detail.component.css']
})
export class ConsultOrderDmDetailComponent implements OnInit {

  order: Order;
  itens: ItemProduct[];

  constructor(private route: ActivatedRoute,
    private service: OrdersService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('orderId');
    this.service.getOrder(id)
      .subscribe(order => {
        this.order = order;
        const id = +this.route.snapshot.paramMap.get('orderId');
        this.service.getOrderItens(id)
          .subscribe(itens => {
            this.itens = itens;
          });
      });
  }

  goBack(): void {
    this.router.navigate(['/ConsultOrderDM',]);
  }
}
