import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UsersService } from '../users.service';
import { Catalog } from '../model/catalog';
import { CatalogService } from '../catalog.service';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-catalog-detail',
  templateUrl: './user-catalog-detail.component.html',
  styleUrls: ['./user-catalog-detail.component.css']
})

export class UserCatalogDetailComponent implements OnInit {

  @Input() catalog: Catalog;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private productService: ProductService,
    private location: Location,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if (this.usersService.getUser() == null) {
      this.router.navigate(['/login']);
    }
    this.displayCatalog();
  }

  displayCatalog(): void {
    const id = +this.route.snapshot.paramMap.get('catalogId');
    this.catalogService.getCatalog(id)
      .subscribe(catalog => {
        this.catalog = catalog;
        this.products = catalog.products;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
