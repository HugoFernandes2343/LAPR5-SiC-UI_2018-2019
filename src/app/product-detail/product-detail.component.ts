import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../model/product';
import { ProductService } from '../product.service';
import { Dimension } from '../model/dimension';
import { Material } from '../model/material';
import { Finishing } from '../model/finishing';
import { ShareService } from '../share.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Input() dim: Dimension;
  @Input() mat: Material;
  @Input() mat_type: string;
  @Input() fin: Finishing;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private share: ShareService
  ) { }

  ngOnInit(): void {
    if (this.share.checkData()) {
      this.getProductActual();
    } else {
      this.getProduct();
    }

    this.initializeDim();
    this.initializeMat();
    this.initializeFin();
  }

  initializeDim(): any {
    this.dim = new Dimension;
  }
  initializeMat(): any {
    this.mat = new Material;
    this.mat.finishesDTO = [];
  }
  initializeFin(): any {
    this.fin = new Finishing;
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('productId');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  getProductActual(): void {
    this.product = this.share.getData();
  }

  addDim(): void {
    this.product.dimensions[this.product.dimensions.length] = this.dim;
    this.share.setData(this.product);
    window.location.reload();
  }

  addMat(): void {
    if(this.checkMat()){
      window.alert("The Material already exixsts or the field is empty");
    } else {
      this.product.materials[this.product.materials.length] = this.mat;
      this.share.setData(this.product);
      window.location.reload();
    }
  }

  addFin(): void {
    if(this.checkFin()){
      window.alert("Invalid fields");
    } else{
      for (let i = 0; i < this.product.materials.length; i++) {
        if (this.product.materials[i].type == this.mat_type) {
          this.product.materials[i].finishesDTO[this.product.materials[i].finishesDTO.length] = this.fin;
          this.share.setData(this.product);
          window.location.reload();
        }
      }
    }
  }

  checkMat(): any {
    this.mat.type = this.mat.type.trim();
    if (!this.mat.type) {
      return true;
    }
    for (let i = 0; i < this.product.materials.length; i++) {
      if (this.product.materials[i].type == this.mat.type) {
        return true;
      }
    }
    return false;
  }

  checkFin(): any {
    this.mat_type = this.mat_type.trim();
    this.fin.type = this.fin.type.trim();
    let flag=1;
    if (!this.fin.type) {
      return true;
    }
    if (!this.mat_type) {
      return true;
    }
    for (let i = 0; i < this.product.materials.length; i++) {
      if (this.product.materials[i].type == this.mat_type) {
        flag=0;
        for (let j = 0; j < this.product.materials[i].finishesDTO.length; j++) {
          if (this.product.materials[i].finishesDTO[j].type == this.fin.type) {
            return true;
          }
        }
      }
    }
    if(flag>0){
      return true;
    }
    return false;
  }

  reset(): void {
    this.share.clearData();
    window.location.reload();
  }

  goBack(): void {
    this.share.clearData();
    this.location.back();
  }

  save(): void {
    this.share.clearData();
    this.productService.updateProduct(this.product)
      .subscribe(() => this.goBack());
  }
}