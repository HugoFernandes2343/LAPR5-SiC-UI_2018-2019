import { Injectable } from '@angular/core';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  product: Product = new Product();

  constructor() { }

  setProduct(product: Product): void {
    this.product = product;
  }
}
