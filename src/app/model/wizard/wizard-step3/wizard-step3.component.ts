import { Component, OnInit } from '@angular/core';
import { Product } from '../../../data/product';
import { SharedDataService } from '../../../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard-step3',
  templateUrl: './wizard-step3.component.html',
  styleUrls: ['./wizard-step3.component.css']
})

export class WizardStep3Component implements OnInit {

  product: Product;
  children: Product[];

  constructor(private sharedDataService: SharedDataService,
    private router: Router) {
    this.product = this.sharedDataService.product;
    this.children = this.product.prod_childProds;
    this.listOrder(this.product);
   }

  ngOnInit() {
    this.product = this.sharedDataService.product;
    this.listOrder(this.product);
  }

  listOrder(prod: Product){
    var childs = this.product.prod_childProds;
  }

  finish(){
    this.router.navigate(['catalog']);
  }

}
