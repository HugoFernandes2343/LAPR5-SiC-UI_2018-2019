import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemProduct } from '../model/ItemProduct';
import { Product } from '../model/product';
import { ItemProductService } from '../item-product.service';
import { ProductService } from '../product.service';
import { ShareService } from '../share.service';
import { Finishing } from '../model/finishing';
import { Material } from '../model/material';

@Component({
  selector: 'app-itemproduct-detail',
  templateUrl: './itemproduct-detail.component.html',
  styleUrls: ['./itemproduct-detail.component.css']
})


export class ItemproductDetailComponent implements OnInit {
  @Input() itemProduct: ItemProduct;

  @Input() product: Product;

  @Input() material: Material;

  @Input() finishing: Finishing;

  constructor(
    private route: ActivatedRoute,
    private itemproductService: ItemProductService,
    private productService: ProductService,
    private location: Location,
    private share: ShareService
  ) { }

  ngOnInit() {
    this.getProductInItem();
    this.getMaterialInItem();
    this.getFinishingInItem();
    this.getItemProduct();
  }

  getItemProduct(): void {
    const id = this.route.snapshot.paramMap.get('itemId');
    this.itemproductService.getItemProduct(id).subscribe(itemProduct => 
      this.itemProduct = itemProduct);
      var test = this.itemProduct;
  }

  getProductInItem():void {
    const id = this.route.snapshot.paramMap.get('itemId');
    this.itemproductService.getProductInItem(id).subscribe(product => this.product = product);
  }

  getMaterialInItem():void {
    const id = this.route.snapshot.paramMap.get('itemId');
    this.itemproductService.getMaterialInItem(id).subscribe(material => this.material = material);
  }

 getFinishingInItem():void {
    const id = this.route.snapshot.paramMap.get('itemId');
    this.itemproductService.getFinishingInItem(id).subscribe(finishing => this.finishing = finishing);
  }

  goBack(): void {
    this.location.back();
  }

 /*save(): void {
    this.location.back();
  }*/
}
