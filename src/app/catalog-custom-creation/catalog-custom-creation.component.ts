import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Catalog } from '../model/catalog';
import { Product } from '../model/product';
import { CatalogService } from '../catalog.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-catalog-custom-creation',
  templateUrl: './catalog-custom-creation.component.html',
  styleUrls: ['./catalog-custom-creation.component.css']
})
export class CatalogCustomCreationComponent implements OnInit {

  //@Input() catalog: Catalog;
  @Input() name: string;
  @Input() description: string;

  products: Product[];
  selectedProducts: Product[];

  constructor(
    private catalogService: CatalogService,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  createCustomCatalog(prodList: Product[]): void {
    var catalog = new Catalog();
    catalog.date = new Date();
    catalog.name = this.name;
    catalog.description = this.description;
    catalog.product_list = prodList;

    this.catalogService.addCatalog(catalog);
  }

  getSelectedProducts(): void {
    var prodList: Product[];
    //retriveve selected products in checkboxes
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

}
