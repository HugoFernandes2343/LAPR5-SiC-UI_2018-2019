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
  cproducts: Product[];
  products: Product[];

  current_product: Product;
  isVisible: boolean;
  selectedProducts: Product[];

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
    this.selectedProducts = [];
    this.isVisible = false;
  }

  displayAddProduct(){
    this.snackBar.open("Product added to selection","Dismiss", {
      duration: 700,
    });
  }

  displayRemProduct(){
    this.snackBar.open("Product removed from selection","Dismiss", {
      duration: 700,
    });
  }

  displayCatalog(): void {
    const id = +this.route.snapshot.paramMap.get('catalogId');
    this.catalogService.getCatalog(id)
      .subscribe(catalog => {
        this.catalog = catalog;
        this.cproducts = catalog.products;
      });
  }

  showAddProductsSection(){
    this.isVisible = !this.isVisible;
  }

  addProductToList(product: Product): void {
    this.productService.getProduct(product.productId).subscribe(
      prod => {
        this.current_product = prod;
        console.log(prod.name);
        this.selectedProducts.push(prod);
      }
    );
  }

  removeProductFromList(product: Product): void {
    if (this.selectedProducts.length == 0) {
      return;
    } else {
      for (let prod of this.selectedProducts) {
        if (prod.productId == product.productId) {
          const index = this.selectedProducts.indexOf(prod);
          if (index !== -1) {
            console.log("Deleting : ", this.selectedProducts[index].name);
            this.selectedProducts.splice(index, 1);
          }
        }
      }
    }
  }

  addProductsToCatalog(p): void {
    this.catalogService.addProductToCatalog(this.catalog.catalogId, p.productId/*this.selectedProducts[0].productId*/)
      .subscribe(endCatalog => console.log("End with : " + JSON.stringify(endCatalog)));
    console.log("Added : ", JSON.stringify(this.catalog));
  }

  save(): void {
    if (this.selectedProducts.length == 0) {
      window.alert("No new products selected");
    } else {
      for (let p of this.selectedProducts) {
        this.catalog.products.push(p);
        this.addProductsToCatalog(p);
      }
      window.location.reload();
    }
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

  displayRemovalProduct() {
    this.snackBar.open("Product will be removed from Catalog", "Dismiss", {
      duration: 700,
    });
  }

  deleteFromCatalog(productId: number): void {
    this.catalogService.deleteProductCatalog(this.catalog.catalogId, productId).subscribe();
  }

}
