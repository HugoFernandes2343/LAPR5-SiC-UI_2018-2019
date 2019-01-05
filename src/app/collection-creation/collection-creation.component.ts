import {Component, OnInit, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Collection} from '../model/collection';
import {Product} from '../model/product';
import {CollectionService} from '../collection.service';
import {ProductService} from '../product.service';
import {SelectMultipleControlValueAccessor} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {MatSnackBar} from '@angular/material';



@Component({
    selector: 'app-collection-creation',
    templateUrl: './collection-creation.component.html',
    styleUrls: ['./collection-creation.component.css']
})
export class CollectionCreationComponent implements OnInit {

    @Input() collection: Collection;
    @Input() collectionName: string;
    @Input() aestheticParameter: string;

    isVisible: boolean;
    justAddedCollection: Collection;
    products: Product[];
    current_product: Product;
    selectedProducts: Product[];

    constructor(
        private snackBar: MatSnackBar,
        private collectionService: CollectionService,
        private productService: ProductService,
        private location: Location,
        private router: Router,
        private usersService: UsersService) {
    }

    ngOnInit() {
        if(this.usersService.getUser() == null){
            this.router.navigate(['/login']);
        }
        this.collection = new Collection();
        this.justAddedCollection = new Collection();
        this.selectedProducts = [];
        this.isVisible = false;
        this.displayList();
    }

    displayAddProduct(){
        this.snackBar.open("Product added","Dismiss", {
            duration: 500,
        });
    }

    displayRemProduct(){
        this.snackBar.open("Product removed","Dismiss", {
            duration: 500,
        });
    }

    displayList(): void {
        this.productService.getProducts()
            .subscribe(products => {
                this.products = products;
            });
    }

    createCollection(): void {
        this.collection.collectionName = this.collectionName;
        this.collection.aestheticParameter = this.aestheticParameter;
        this.collectionService.addCollection(this.collection).subscribe(col => {
            this.justAddedCollection = col;
            this.isVisible = !this.isVisible;
            console.log("Added : ", JSON.stringify(this.justAddedCollection));
        });
    }

    addProductsToCollection(p): void {
        this.collectionService.addProductToCollection(this.justAddedCollection.CollectionId, p.productId/*this.selectedProducts[0].productId*/)
            .subscribe(endCollection => console.log("End with : " + JSON.stringify(endCollection)));
        //console.log("Added : ", JSON.stringify(p));
        //}
        //this.collectionService.updateCollection(this.justAddedCollection);
        console.log("Added : ", JSON.stringify(this.justAddedCollection));
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

    saveFirstStage(): void {
        this.createCollection();
    }

    save(): void {
        if (this.selectedProducts.length == 0) {
            window.alert("Choose at least one Product");
        } else {
            for (let p of this.selectedProducts) {
                this.justAddedCollection.products.push(p);
                this.addProductsToCollection(p);
            }
            console.log("Saving : ", this.collection.collectionName);
            window.location.reload();
        }
    }

    goBack(): void {
        this.location.back();
    }

}
