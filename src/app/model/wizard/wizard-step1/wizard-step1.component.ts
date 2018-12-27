import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Product } from '../../../data/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, Route } from "@angular/router";
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-wizard-step1',
  templateUrl: './wizard-step1.component.html',
  styleUrls: ['./wizard-step1.component.css']
})

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
})

export class WizardStep1Component implements OnInit {

  @Input() product: Product = new Product();

  realizedProduct: Product = new Product();

  finishes: string[] = [];

  selectedMaterial: string = "--Select--";
  selectedFinish: string = "--Select--";
  selectedHeight: number;
  selectedDepth: number;
  selectedWidth: number;


  discreteHeight: boolean;
  discreteDepth: boolean;
  discreteWidth: boolean;


  validHeight: boolean = true;
  heightError: string = "";
  validWidth: boolean = true;
  widthError: string = "";
  validDepth: boolean = true;
  depthError: string = "";
  validForm: boolean = false;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private sharedDataService: SharedDataService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id)
      .subscribe(product => this.product = product,
        () => { },
        () => this.initProductDetails());
  }

  setHeight(selectedHeight: number): void {
    this.selectedHeight = selectedHeight;
  }

  setDepth(selectedDepth: number): void {
    this.selectedDepth = selectedDepth;
  }

  setWidth(selectedWidth: number): void {
    this.selectedWidth = selectedWidth;
  }

  setMaterial(selectedMaterial: string): void {
    this.selectedMaterial = selectedMaterial;
  }
  setFinish(selectedFinish: string): void {
    this.selectedFinish = selectedFinish;
  }

  initProductDetails(): void {

    for (var i = 0; i < this.product.prod_materials.length; i++) {
      for (var j = 0; j < this.product.prod_materials[i].material_finishes.length; j++) {
        this.finishes.push(this.product.prod_materials[i].material_finishes[j].finish_name);
      }
    }

    this.selectedHeight = this.product.prod_height;
    this.selectedDepth = this.product.prod_depth;
    this.selectedWidth = this.product.prod_width;
    this.findDiscreteMeasurements();
    this.validateForms();
    this.initRealizedProduct();

  }

  initRealizedProduct(): void {
    this.realizedProduct.prod_name = this.product.prod_name;
    this.realizedProduct.prod_desc = this.product.prod_desc;
    this.realizedProduct.prod_price = this.product.prod_price;
    this.realizedProduct.prod_minOccupation = this.product.prod_minOccupation;
    this.realizedProduct.prod_maxOccupation = this.product.prod_maxOccupation;
    this.realizedProduct.prod_category = this.product.prod_category;
    this.realizedProduct.prod_height = this.product.prod_height;
    this.realizedProduct.prod_width = this.product.prod_width;
    this.realizedProduct.prod_depth = this.product.prod_depth;
    this.realizedProduct.prod_childProds = this.product.prod_childProds;
  }

  validateForms(): void {

    if (this.product.prod_heightMax == 0) {

      var result = this.validateDiscreteMeasurements(
        this.selectedHeight,
        this.product.prod_height);

      if (!result) this.heightError = "Height can't be different from " + this.product.prod_height;

      this.validHeight = result;
    }
    else if (this.product.prod_heightMax > 0) {

      var result = this.validateContinuousMeasurements(
        this.selectedHeight,
        this.product.prod_height,
        this.product.prod_heightMax);

      if (!result) this.heightError = "Height must be between " + this.product.prod_height + " and " + this.product.prod_heightMax + "."
      this.validHeight = result;
    }


    if (this.product.prod_widthMax == 0) {

      var result = this.validateDiscreteMeasurements(
        this.selectedWidth,
        this.product.prod_width);


      if (!result) this.widthError = "Width can't be different from " + this.product.prod_width;
      this.validWidth = result;
    }

    else if (this.product.prod_widthMax > 0) {

      var result = this.validateContinuousMeasurements(
        this.selectedWidth,
        this.product.prod_width,
        this.product.prod_widthMax);

      if (!result) this.widthError = "Width must be between " + this.product.prod_width + " and " + this.product.prod_widthMax + "."
      this.validWidth = result;
    }

    if (this.product.prod_depthMax == 0) {

      var result = this.validateDiscreteMeasurements(
        this.selectedDepth,
        this.product.prod_depth);


      if (!result) this.depthError = "Depth can't be different from " + this.product.prod_depth;
      this.validDepth = result;

    }
    else if (this.product.prod_depthMax > 0) {

      var result = this.validateContinuousMeasurements(
        this.selectedDepth,
        this.product.prod_depth,
        this.product.prod_depthMax);

      if (!result) this.depthError = "Depth must be between " + this.product.prod_depth + " and " + this.product.prod_depthMax + "."
      this.validDepth = result;

    }


    if (this.validHeight && this.validDepth && this.validWidth
      && this.selectedFinish !== "--Select--" && this.selectedMaterial !== "--Select--") this.validForm = true;
    else this.validForm = false;

  }

  validateDiscreteMeasurements(input: number, ProdValue: number): boolean {
    if (input != ProdValue) {
      return false;
    }
    return true;
  }

  validateContinuousMeasurements(input: number, ProdValue: number, ProdValueMax: number): boolean {
    if (input < ProdValue) return false;
    if (input > ProdValueMax) return false;
    return true;
  }


  findDiscreteMeasurements(): void {
    if (this.product.prod_heightMax == 0)
      this.discreteHeight = true;
    else if (this.product.prod_heightMax > 0)
      this.discreteHeight = false;


    if (this.product.prod_widthMax == 0)
      this.discreteWidth = true;
    else if (this.product.prod_widthMax > 0)
      this.discreteWidth = false;


    if (this.product.prod_depthMax == 0)
      this.discreteDepth = true;
    else if (this.product.prod_depthMax > 0)
      this.discreteDepth = false;
  }

  nextStep(): void {
    this.realizedProduct.prod_dotnetid = +this.route.snapshot.paramMap.get('id');
    this.realizedProduct.prod_height = this.selectedHeight;
    this.realizedProduct.prod_width = this.selectedWidth;
    this.realizedProduct.prod_depth = this.selectedWidth;

    var material;
    var finish;

    for (var i = 0; i < this.product.prod_materials.length; i++) {
      if (this.selectedMaterial === this.product.prod_materials[i].material_name) {
        material = this.product.prod_materials[i];
      }
      for (var j = 0; j < this.product.prod_materials[i].material_finishes.length; j++) {
        if (this.selectedFinish === this.product.prod_materials[i].material_finishes[j].finish_name) {
          finish = this.product.prod_materials[i].material_finishes[j];
          break;
        }
      }
    }

    material.material_finishes = finish;
    this.realizedProduct.prod_materials = material;
    this.sharedDataService.setProduct(this.realizedProduct);
    this.router.navigate(['wizard2']);
  }

  goBack(): void {
    this.location.back();
  }

}
