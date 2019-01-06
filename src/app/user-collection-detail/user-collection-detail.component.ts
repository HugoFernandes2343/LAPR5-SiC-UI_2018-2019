import {Component, Input, OnInit} from '@angular/core';
import {Collection} from "../model/collection";
import {ActivatedRoute, Router} from "@angular/router";
import {CollectionService} from "../collection.service";
import {Location} from "@angular/common";
import {UsersService} from "../users.service";
import {Product} from "../model/product";

@Component({
    selector: 'app-user-collection-detail',
    templateUrl: './user-collection-detail.component.html',
    styleUrls: ['./user-collection-detail.component.css']
})
export class UserCollectionDetailComponent implements OnInit {

    @Input() collection: Collection;
    products: Product[];

    constructor(
        private route: ActivatedRoute,
        private collectionService: CollectionService,
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
            .subscribe(collection => {
                this.collection = collection;
                this.products = collection.products
            });
    }

    goBack(): void {
        this.location.back();
    }

}
