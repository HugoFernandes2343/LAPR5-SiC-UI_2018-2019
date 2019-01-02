import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Catalog } from '../model/catalog';
import { Product } from '../model/product';
import { CatalogService } from '../catalog.service';
import { ProductService } from '../product.service';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-catalog-custom-creation',
  templateUrl: './catalog-custom-creation.component.html',
  styleUrls: ['./catalog-custom-creation.component.css']
})
export class CatalogCustomCreationComponent implements OnInit {

  @Input() catalog: Catalog;
  @Input() name: string;
  @Input() description: string;

  size: number;
  products: Product[];
  current_product: Product;
  selectedProducts: Product[];
  //selectedProducts: Array<Product>;

  constructor(
    private catalogService: CatalogService,
    private productService: ProductService,
    private location: Location
  ) {
    this.catalog = new Catalog();
    this.selectedProducts = [];
  }

  ngOnInit() {
    this.displayList();
  }


  displayList(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.size = products.length;
        this.products = products;
      });
  }

  createCustomCatalog(prodList: Product[]): void {
    this.catalog.date = new Date();
    this.catalog.name = this.name;
    this.catalog.description = this.description;
    this.catalog.product_list = prodList;
    this.catalogService.addCatalog(this.catalog);
  }

  addProductToList(product: Product): void {
    this.productService.getProduct(product.productId).subscribe(
      prod => {
        this.current_product = prod;
        console.log(prod.name);
        this.selectedProducts.push(this.current_product);
      }
    );
  }

  removeProductFromList(product: Product): void {
    console.log("To delete : ", product.name);
    if (this.selectedProducts.length == 0) {
      console.log("Empty array. Exiting");
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

  getSelectedProducts(): Product[] {
    return this.selectedProducts;
  }

  reset(): void {
    window.location.reload();
  }

  save(): void {
    let productFinalList: Product[];
    productFinalList = this.getSelectedProducts();
    this.createCustomCatalog(productFinalList);
  }

  goBack(): void {
    //console.log("this.size : ", this.size);
    this.location.back();
  }

}
