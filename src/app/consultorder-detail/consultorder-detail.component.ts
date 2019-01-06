import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-consultorder-detail',
  templateUrl: './consultorder-detail.component.html',
  styleUrls: ['./consultorder-detail.component.css']
})
export class ConsultOrderDetailComponent implements OnInit {

  locations = ["Porto", "Lisboa", "Aveiro", "Beja", "Braga", "Bragança",
    "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Portalegre", "Santarém",
    "Setúbal", "Viana do Castelo", "Vila Real", "Viseu"];
    
  order: Order;
  item: ItemProduct;
  itens: ItemProduct[];

  constructor(private route: ActivatedRoute,
    private service: OrdersService,
    private location: Location,
    private router: Router, 
    private userService: UsersService) { }

  ngOnInit() {
    if(this.userService.getUser() == null){
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

    if (this.order.date == "" || this.order.date == null) { window.alert("Date is Empty or null"); return; }
    if (this.order.address == "" || this.order.address == null) { window.alert("Address is Empty or null"); return; }
    if (!this.locations.includes(this.order.address)) { window.alert("Address is Invalid!"); return; }

    var CurrentDate = new Date();
    var GivenDate = new Date(this.order.date);

    if (GivenDate < CurrentDate) { window.alert('Given date is Invalid!'); return; }

    this.service.updateOrderDetails(this.order)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['/Order',]);
  }

}
