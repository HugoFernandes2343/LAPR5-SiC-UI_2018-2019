import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../product.service";

import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit {

  @Input() product: Product;

  products: Product[];

  constructor(
      private productService: ProductService,
      private location: Location,
      private router: Router,
      private usersService: UsersService
  ) { }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.displayList();
  }

  displayList(): void {

    this.productService.getProducts()
        .subscribe(products => this.products = products);
  }

  goBack(): void {
    this.location.back();
  }

}
