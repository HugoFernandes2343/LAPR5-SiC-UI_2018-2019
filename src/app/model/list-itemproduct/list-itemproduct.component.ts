import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-itemproduct',
  templateUrl: './list-itemproduct.component.html',
  styleUrls: ['./list-itemproduct.component.css']
})
export class ListItemproductComponent implements OnInit {

  itemProducts: Product[] = [];
  orders: any[];
  hasProducts: boolean = false;


  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
        (orders) => {
          for (var i = 0; i < orders.length; i++)
          {
            for (var j = 0; j < orders[i].order_products.length; j++)
            {
              this.orderService.getProduct(orders[i].order_products[j]).subscribe(
                (product) => {
                  this.itemProducts.push(product);
                  this.hasProducts = true;
                  console.log(this.itemProducts);
                },
                () => {},
                () => {}
              )
            }
          }
        },
        (error) => { alert("Something went wrong: " + error.message); console.log(error); },
        () => {}
    );
  }

}
