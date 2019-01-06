import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import {UsersService} from '../users.service';
import {Collection} from '../model/collection';
import {CollectionService} from '../collection.service';
import {Product} from '../model/product';
import {ProductService} from '../product.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-collection-detail',
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

    @Input() collection: Collection;
    products: Product[];

    constructor(
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private collectionService: CollectionService,
        private productService: ProductService,
        private location: Location,
        private router: Router,
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        if (this.usersService.getUser() == null) {
            this.router.navigate(['/login']);
        }
        this.getCollection();
    }

    getCollection(): void {
        const id = +this.route.snapshot.paramMap.get('collectionId');
        this.collectionService.getCollection(id)
            .subscribe(collection => {this.collection = collection;this.products = collection.products});
    }

    reset(): void {
        window.location.reload();
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.collectionService.updateCollection(this.collection)
            .subscribe(() => this.location.back());
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

    deleteFromCollection(productId: number): void {
        this.collectionService.deleteProductCollection(this.collection.collectionId, productId).subscribe();
    }

}
