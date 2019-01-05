import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UsersService } from '../users.service';
import { Collection } from '../model/collection';
import { CollectionService } from '../collection.service';
import { Product } from '../model/product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  @Input() collection: Collection;
  products: Product[];

  constructor(
      private route: ActivatedRoute,
      private collectionService: CollectionService,
      private productService: ProductService,
      private location: Location,
      private router: Router,
      private usersService: UsersService
  ) { }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.displayCustomProducts();
  }

  getCollection(): void {
    const id = +this.route.snapshot.paramMap.get('collectionId');
    this.collectionService.getCollection(id)
        .subscribe(collection => this.collection = collection);
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
    this.collectionService.updateCollection(this.collection)
        .subscribe(() => window.location.reload());
  }

}
