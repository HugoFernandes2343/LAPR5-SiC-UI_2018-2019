import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Product } from '../../../data/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard-step2',
  templateUrl: './wizard-step2.component.html',
  styleUrls: ['./wizard-step2.component.css'],
})
export class WizardStep2Component implements OnInit {

  product: Product;
  components: Product[];
  current_product: Product;
  catalog: Product[];
  product_to_add: Product;
  selectedOption: number;
  componentListAux: Product[];

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private sharedDataService: SharedDataService,
    private location: Location,
    private router: Router) {
      
      this.product = new Product();
      // this.components = [];
      this.current_product = null;
      this.catalog = [];
      this.product_to_add = new Product();
      this.componentListAux = [];
      this.selectedOption = null;
     }

  ngOnInit() {
    
    this.productService.getAllProducts()
      .subscribe((products) => {
        this.catalog = products;
      });
      this.product = this.sharedDataService.product;
      this.productComponentsList(this.product);

  }

  productComponentsList(parent: Product){
    var child_prods = parent.prod_childProds;
    var product_components = [];

    if(child_prods != [] || child_prods != undefined || child_prods != null){
      child_prods.forEach(child => {
        product_components.push(child);
      });
    }

    this.components = product_components;
  }

  setCurrentProduct(prod: Product){
    if(prod != null){
      this.current_product = prod;
    }
    else{
      this.current_product = null;
    }
  }

  removeProductFromAgreggate(prod: Product){
    var child_prods = this.product.prod_childProds;
    child_prods.forEach(child => {
      if(prod == child){
        child_prods.splice(child_prods.indexOf(child),1);
      }
    });

    this.product.prod_childProds = child_prods;
    this.productComponentsList(this.product);
  }

  addProduct(prod: Product){
    var prod_childs = this.product.prod_childProds;
    if(this.product_to_add != null || this.product_to_add == undefined){

      prod_childs.push(prod);
      this.product_to_add = null;
      this.product.prod_childProds = prod_childs;
      this.productComponentsList(this.product);

      return true;
    }
    return false;
  }

  removeComponents(){
    this.current_product = null;
    this.product.prod_childProds = [];
    this.productComponentsList(this.product);
  }

  createOrder(){
    this.sharedDataService.setProduct(this.product);
    this.orderService.createOrder(this.product).subscribe(prod => {
      this.router.navigate(['wizard3']);
    }, (error) => { alert("Could not create order"); console.log(error); },
    () => {});
    
  }

}
