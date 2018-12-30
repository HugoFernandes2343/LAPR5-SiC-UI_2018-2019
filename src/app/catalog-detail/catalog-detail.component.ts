import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Catalog } from '../model/catalog';
import { CatalogService } from '../catalog.service';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.css']
})

export class CatalogDetailComponent implements OnInit {

  @Input() catalog: Catalog;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private productService: ProductService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.displayCustomProducts();
  }

  getCatalog(): void {
    const id = +this.route.snapshot.paramMap.get('catalogId');
    this.catalogService.getCatalog(id)
      .subscribe(catalog => this.catalog = catalog);
  } 

  displayCustomProducts(): any {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.catalogService.updateCatalog(this.catalog)
      .subscribe(() => window.location.reload());
  }
}
