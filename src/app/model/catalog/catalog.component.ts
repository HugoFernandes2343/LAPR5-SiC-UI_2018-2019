import { Component, OnInit, Input, NgIterable } from '@angular/core';
import { Product } from '../../data/product';
import { Category } from '../../data/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  @Input() name_filter: string = "";
  
  @Input() ngForOf: NgIterable<boolean>;
  minValue: number = 0;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number): string => {
      return '€' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }
  };

  constructor(private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }

  resfreshFilter(){
    var prods = [];
    this.productService.getAllProducts()
      .subscribe(products => {
        products.forEach(prod => {

          //if(this.filterByCategory(prod)){
            if(this.filterByName(prod)){
              if(this.filterByPrice(prod)){
                prods.push(prod);
              }
            }
          //}
        });
        this.products = prods;
      });
  }

  filterByPrice(prod: Product){
    if(prod.prod_price > this.minValue && prod.prod_price < this.maxValue){
      return true;
    }
    return false;
  }

  filterByName(prod: Product){
    var prod_name = prod.prod_name.toString().toLocaleLowerCase();
    var name_filter = this.name_filter.toLocaleLowerCase();
    var exp = '[0-9]*[a-zA-Z]*' + name_filter + '[0-9]*[a-zA-Z]*';
    var regexp = new RegExp(exp);
    if(name_filter == '' || name_filter == null || name_filter == undefined){
      return true;
    } 
    if(regexp.test(prod_name)){
      return true;
    }
    return false;
    
  }

}
