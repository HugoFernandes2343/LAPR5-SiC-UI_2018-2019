import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/data/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();

  components: any[] = [];

  availableMaterials: any[] = [];
  availableFinishes: any[] = [];
  availableCategories: any = [];

  selectedHeight: number;
  selectedHeightMax: number;
  selectedWidth: number;
  selectedWidthMax: number;
  selectedDepth: number;
  selectedDepthMax: number;
  selectedMaterial: number;
  selectedComponent: number;
  selectedCurrentMaterial: number;
  selectedCategory: number;
  selectedName: string;
  selectedDescription: string;
  selectedMinOccupation: number;
  selectedMaxOccupation: number;
  selectedParent: number;
  selectedPrice: number;

  valid: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.productService.getDotnetMaterials().subscribe((data) => { this.availableMaterials = data; });
    this.productService.getAllProducts().subscribe((data) => { this.components = data; });
    this.productService.getDotnetCategories().subscribe((data) => {

      this.availableCategories.push({ id: data.id, name: data.name, parentId: data.parentId, parentCategory: data.parentCategory });
      for (var i = 0; i < data.subCategories.length; i++) {
        this.availableCategories.push(data.subCategories[i]);
      }

    });
  }

  goBack() {
    this.location.back();
  }



  validateForms(): void {

    this.valid = true;

    if (this.selectedMaxOccupation < 0 || this.selectedMaxOccupation < this.selectedMinOccupation
      || this.selectedMaxOccupation > 100 || this.selectedMaxOccupation > 100) {
      this.valid = false;
    }
    if ((this.selectedHeightMax == 0 && this.selectedHeight <= 0) ||
      (this.selectedHeightMax != 0 && this.selectedHeightMax <= this.selectedHeight)) {
      this.valid = false;
    }

    if ((this.selectedDepthMax == 0 && this.selectedDepth < 0) ||
      (this.selectedDepthMax != 0 && this.selectedDepthMax < this.selectedDepth)) {
      this.valid = false;
    }

    if ((this.selectedWidthMax == 0 && this.selectedWidth < 0) ||
      (this.selectedWidthMax != 0 && this.selectedWidthMax < this.selectedWidth)) {
      this.valid = false;
    }

    if (this.selectedName == undefined || this.selectedDescription == undefined
      || this.selectedCategory == undefined || this.selectedMinOccupation == undefined
      || this.selectedMaxOccupation == undefined || this.selectedWidth == undefined
      || this.selectedWidthMax == undefined || this.selectedHeight == undefined
      || this.selectedHeightMax == undefined || this.selectedDepth == undefined
      || this.selectedDepthMax == undefined || this.selectedMaterial == undefined
      || this.selectedPrice == undefined) {
      this.valid = false;
    }
  }

  createProduct(): void {
    if (this.selectedParent == null || this.selectedParent == undefined) {
      this.selectedParent = -1;
    }

    /**
     * Creating the dimension..
     */
    this.productService.createDotnetDimension(
      this.selectedHeight, this.selectedHeightMax,
      this.selectedWidth, this.selectedWidthMax,
      this.selectedDepth, this.selectedDepthMax).subscribe(
        (dimension) => {

          /**
           * Creating the product..
           */
          this.productService.createDotnetProduct({
            Name: this.selectedName,
            Description: this.selectedDescription,
            Price: this.selectedPrice,
            MaxOccupation: this.selectedMaxOccupation,
            MinOccupation: this.selectedMinOccupation,
            DimensionId: dimension.id,
            CategoryId: this.selectedCategory,
            ParentId: this.selectedParent,
            RestrictionId: 1
          }).subscribe(
            (product) => {
              /**
               * Binding the material to the product..
               */
              this.productService.createDotnetMaterialProduct(product.id, this.selectedMaterial).subscribe(
                () => {
                  alert("Product was created.");
                  window.location.reload();
                },
                (error) => {
                  console.log("Could not create material product: " + error);
                  alert("Something went wrong while binding the material to the product.");
                },
                () => { }
              )
            },
            (error) => {
              console.log(error);
              if (error.error = "SyntaxError") {
                alert("Product was created.")
                window.location.reload();
              } else {
                alert("Could not create product: " + error);
              }
            },
            () => {
            }

          );
        },
        (error) => { alert("Could not create dimension!"); console.log(error); },
        () => { }
      );



  }



  setComponent(component: number): void {
    this.selectedComponent = component;
  }
  setCategory(category: number): void {
    this.selectedCategory = category;
  }
  setHeight(height: number): void {
    this.selectedHeight = height;
  }
  setHeightMax(height: number): void {
    this.selectedHeightMax = height;
  }
  setWidth(width: number): void {
    this.selectedWidth = width;
  }
  setWidthMax(width: number): void {
    this.selectedWidthMax = width;
  }
  setDepth(depth: number): void {
    this.selectedDepth = depth;
  }
  setDepthMax(depth: number): void {
    this.selectedDepthMax = depth;
  }
  setCurrentMaterial(material: any): void {
    this.selectedCurrentMaterial = material;
  }
  setMaterial(material: any): void {
    this.selectedMaterial = material;
    this.availableFinishes = [];
    for (var i = 0; i < this.availableMaterials.length; i++) {

      if (this.availableMaterials[i].id == this.selectedMaterial) {
        for (var j = 0; j < this.availableMaterials[i].finishes.length; j++) {

          var finish = this.availableMaterials[i].finishes[j];

          if (!(finish in this.availableFinishes)) {
            this.availableFinishes.push(finish);
          }
        }

      }
    }
  }
  setName(name: string): void {
    this.selectedName = name;
  }
  setDescription(desc: string): void {
    this.selectedDescription = desc;
  }
  setMinOccupation(occ: number): void {
    this.selectedMinOccupation = occ;
  }
  setMaxOccupation(occ: number): void {
    this.selectedMaxOccupation = occ;
  }
  setParent(parent: number): void {
    this.selectedParent = parent;
  }
  setPrice(price: number): void {
    this.selectedPrice = price;
  }
}
