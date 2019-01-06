import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Catalog } from '../model/catalog';
import { Product } from '../model/product';
import { CatalogService } from '../catalog.service';
import { ProductService } from '../product.service';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-catalog-custom-creation',
  templateUrl: './catalog-custom-creation.component.html',
  styleUrls: ['./catalog-custom-creation.component.css']
})
export class CatalogCustomCreationComponent implements OnInit {

  @Input() catalog: Catalog;
  @Input() name: string;
  @Input() description: string;

  isVisible: boolean;
  justAddedCatalog: Catalog;
  products: Product[];
  current_product: Product;
  selectedProducts: Product[];

  constructor(
    private snackBar : MatSnackBar,
    private catalogService: CatalogService,
    private productService: ProductService,
    private location: Location,
    private router: Router, 
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.catalog = new Catalog();
    this.justAddedCatalog = new Catalog();
    this.selectedProducts = [];
    this.isVisible = false;
    this.displayList();
  }

  displayAddProduct(){
    this.snackBar.open("Product added","Dismiss", {
      duration: 700,
    });
  }

  displayRemProduct(){
    this.snackBar.open("Product removed","Dismiss", {
      duration: 700,
    });
  }

  displayList(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  createCustomCatalog(): void {
    this.catalog.date = new Date();
    this.catalog.catalogName = this.name;
    this.catalog.catalogDescription = this.description;
    this.catalogService.addCatalog(this.catalog).subscribe(cat => {
      this.justAddedCatalog = cat;
      this.isVisible = !this.isVisible;
      console.log("Added : ", JSON.stringify(this.justAddedCatalog));
    });
  }

  addProductsToCatalog(p): void {
    this.catalogService.addProductToCatalog(this.justAddedCatalog.catalogId, p.productId/*this.selectedProducts[0].productId*/)
      .subscribe(endCatalog => console.log("End with : " + JSON.stringify(endCatalog)));
    //console.log("Added : ", JSON.stringify(p));
    //}
    //this.catalogService.updateCatalog(this.justAddedCatalog);
    console.log("Added : ", JSON.stringify(this.justAddedCatalog));
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

  reset(): void {
    window.location.reload();
  }

  saveFirstStage(): void {
    this.createCustomCatalog();
  }

  save(): void {
    if (this.selectedProducts.length == 0) {
      window.alert("Choose at least one Product");
    } else {
      for (let p of this.selectedProducts) {
        this.justAddedCatalog.products.push(p);
        this.addProductsToCatalog(p);
      }
      console.log("Saving : ", this.catalog.catalogName);
      this.location.back();
    }
  }

  goBack(): void {
    this.location.back();
  }

}
