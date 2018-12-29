import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  products: Product[];
  selectedCategory: number;
  categories: Category[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.displayList();
    this.getCategories();
    this.initializeProduct();
  }

  displayList(): void {

    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  getCategories(): any {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  initializeProduct(): any {
    this.product = new Product();
  }

  save(): void {
    this.product.name = this.product.name.trim();
    if (!this.product.name) { return; }

    this.product.description = this.product.description.trim();
    if (!this.product.description) { return; }

    if (this.product.category == null) { return; }

    this.productService.addProduct(this.product).subscribe(() => window.location.reload());
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

}
