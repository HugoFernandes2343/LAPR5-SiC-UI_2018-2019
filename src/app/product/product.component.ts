import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  products: Product[];

  constructor(
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {

    this.productService.getProducts()
      .subscribe(products => this.products = products);

    /*var ul = document.querySelector("ul");

    for (var i = 0; i < this.products.length; i++) {
      var element = this.products[i];

      var listItem = document.createElement("li");
      listItem.title = element.name;
      listItem.textContent = element.category.name;

      ul.appendChild(listItem);*/
  }

  goBack(): void {
    this.location.back();
  }

}
