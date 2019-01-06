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

  status = ["Submitted", "Validated", "Assigned", "Production", "Packing", "Ready",
    "Expedited", "Delivered", "Recieved"]; 
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
    if( this.order.status == ""){window.alert("Order status is empty or null!");return;}

    if (!this.status.includes(this.order.status)) { window.alert("Status is Invalid!"); return; }

    this.service.updateOrderDetails(this.order).subscribe(() => window.location.reload());
  }

  goBack(): void {
    this.router.navigate(['/ConsultOrderDM',]);
  }
}
