import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";

import {Location} from "@angular/common";
import {ShareService} from "../share.service";
import {UsersService} from "../users.service";

@Component({
    selector: 'app-user-product-detail',
    templateUrl: './user-product-detail.component.html',
    styleUrls: ['./user-product-detail.component.css']
})
export class UserProductDetailComponent implements OnInit {

    @Input() product: Product;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private location: Location,
        private share: ShareService,
        private router: Router,
        private usersService: UsersService
    ) {
    }


    ngOnInit(): void {
        if (this.usersService.getUser() == null
        ) {
            this.router.navigate(['/login']);
        }
        this.getProduct();
    }


    getProduct(): void {
        const id = +this.route.snapshot.paramMap.get('productId');
        this.productService.getProduct(id)
            .subscribe(product => this.product = product);
    }

    goBack(): void {
        this.location.back();
    }
}
