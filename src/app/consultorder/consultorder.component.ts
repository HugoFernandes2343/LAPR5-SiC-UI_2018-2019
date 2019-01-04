import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Order } from '../model/order';
import { ConsultOrderService } from '../consultorder.service';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-consultorder',
  templateUrl: './consultorder.component.html',
  styleUrls: ['./consultorder.component.css']
})
export class ConsultOrderComponent implements OnInit {
  @Input() order: Order;

  orders: Order[];
  selectedProduct: number;
  products: Product[];

  constructor(
    private productService: ProductService,
    private orderService: ConsultOrderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.displayList();
    this.initializeOrder();
  }

  displayList(): void {

    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  initializeOrder(): any {
    this.order = new Order();
    /*this.order.item = new Product(); */
  }

  save(): void {
    this.order.orderName = this.order.orderName.trim();
    if (!this.order.orderName) { return; }

    this.order.address = this.order.address.trim();
    if (!this.order.address) { return; }

    if (this.selectedProduct == null) { return; }

    /*this.order.item = this.products.find(p => p.productId == this.selectedProduct);*/

    this.orderService.addOrder(this.order).subscribe(() => window.location.reload());
  }

  reset(): void {
    window.location.reload();
  }

  delete(order: Order): void {
    this.orderService.deleteOrder(order).subscribe(() => window.location.reload());
  }

  goBack(): void {
    this.location.back();
  }

}
