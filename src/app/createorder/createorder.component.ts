import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../model/Order';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})

export class CreateOrderComponent implements OnInit {

  locations = ["Porto", "Lisboa", "Aveiro", "Beja", "Braga", "Bragança",
    "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Portalegre", "Santarém",
    "Setúbal", "Viana do Castelo", "Vila Real", "Viseu"];

  orders: Order[];
  nextId: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: OrdersService,
    private location: Location,
    private userService: UsersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.service.getOrders()
      .subscribe(orders => {
        this.orders = orders
        this.nextId = "";
        var nextIdAux: number = 0;
        for (var i = 0; i < this.orders.length; i++) {
          var numberId = +this.orders[i].orderId
          if (numberId > nextIdAux) { nextIdAux = numberId }
        }
        nextIdAux = nextIdAux + 1
        this.nextId = String(nextIdAux);
      });
  }

  goBack(): void {
    this.location.back();
  }

  goItens(): void {
    this.router.navigateByUrl(`CreateOrder/${this.nextId}`);
  }

  add(date: string, address: string): void {

    date = date.trim();
    var name = this.userService.getUser().username.trim();
    address = address.trim();
    var cost: number = 0;
    var itens: string[] = [];
    var orderId = this.nextId;

    if (date == "" || date == null) { window.alert("Date is Empty or null"); return; }
    if (address == "" || address == null) { window.alert("Address is Empty or null"); return; }
    if (!this.locations.includes(address)) { window.alert("Address is Invalid!"); return; }

    var CurrentDate = new Date();
    var GivenDate = new Date(date);

    if (GivenDate < CurrentDate) { window.alert('Given date is Invalid!'); return; }

    this.service.addOrder({ orderId, name, date, address, cost, itens } as Order)
      .subscribe(() => this.goItens());
  }
}
