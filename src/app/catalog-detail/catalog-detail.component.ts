import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UsersService } from '../users.service';
import { Catalog } from '../model/catalog';
import { CatalogService } from '../catalog.service';
import { Product } from '../model/product';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.css']
})

export class CatalogDetailComponent implements OnInit {

  @Input() catalog: Catalog;
  products: Product[];

  constructor(
    private snackBar: MatSnackBar,
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

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  saveBasicChanges(): void {
    this.catalogService.updateCatalog(this.catalog)
      .subscribe(() => window.location.reload());
  }

  displayAddProduct() {
    this.snackBar.open("Product added", "Dismiss", {
      duration: 700,
    });
  }

  displayRemProduct() {
    this.snackBar.open("Product will be removed from Catalog", "Dismiss", {
      duration: 700,
    });
  }

  deleteFromCatalog(productId: number): void {
    this.catalogService.deleteProductCatalog(this.catalog.catalogId, productId).subscribe();
  }

}
