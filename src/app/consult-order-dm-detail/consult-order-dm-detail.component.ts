import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../model/Order';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Status } from '../model/status';

@Component({
  selector: 'app-consult-order-dm-detail',
  templateUrl: './consult-order-dm-detail.component.html',
  styleUrls: ['./consult-order-dm-detail.component.css']
})
export class ConsultOrderDmDetailComponent implements OnInit {

  @Input() order: Order;

  selectedStatus: number;
  status: Status[];
  itens: ItemProduct[];

  constructor(private route: ActivatedRoute,
    private service: OrdersService,
    private location: Location,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    if (this.userService.getUser() == null) {
      this.router.navigate(['/login']);
    }
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

  save(): void {
    this.order.name = this.order.name.trim();
    if (!this.order.name) { return; }

    this.order.address = this.order.address.trim();
    if (!this.order.address) { return; }

    this.order.date = this.order.date.trim();

    if (this.selectedStatus == null) { return; }

    this.order.status = this.status.find(s => s.statusId == this.selectedStatus).statusName;

    this.service.addOrder(this.order).subscribe(() => window.location.reload());

  }

  goBack(): void {
    this.router.navigate(['/ConsultOrderDM',]);
  }
}
