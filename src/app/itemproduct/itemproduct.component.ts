import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ItemProductService } from '../item-product.service';
import { ItemProduct } from '../model/ItemProduct';

@Component({
  selector: 'app-itemproduct',
  templateUrl: './itemproduct.component.html',
  styleUrls: ['./itemproduct.component.css']
})
export class ItemProductComponent implements OnInit {
  @Input() itemProduct: ItemProduct;

  items: ItemProduct[];

  constructor(
    private itemProductService: ItemProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {

    this.itemProductService.getItemProducts()
      .subscribe(items => this.items = items);
  }

  delete(item : ItemProduct): void {
    this.itemProductService.deleteItem(item).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
