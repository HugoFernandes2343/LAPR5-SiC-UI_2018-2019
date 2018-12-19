import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() product: any;
  requestProduct: any;

  validMeasures: boolean;
  currentFinishes: any[] = [];
  components: any[] = [];

  availableMaterials: any[] = [];
  availableFinishes: any[] = [];

  selectedHeight: number;
  selectedHeightMax: number;
  selectedWidth: number;
  selectedWidthMax: number;
  selectedDepth: number;
  selectedDepthMax: number;
  selectedFinish: number;
  selectedMaterial: number;
  selectedComponent: number;
  selectedCurrentMaterial: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getDotNetProductById(id)
      .subscribe(
        (product) => {
          this.product = product;
          this.parseProduct();
        },
        () => { },
        () => { });
  }

  parseProduct(): void {
    var product = {
      Name: "", Description: "", Price: 0, MaxOccupation: 0,
      MinOccupation: 0, DimensionId: -1, CategoryId: -1, RestrictionId: -1, ParentId: -1
    };

    product.Name = this.product.name;
    product.Description = this.product.description;
    product.Price = this.product.price;
    product.MaxOccupation = this.product.maxOccupation;
    product.MinOccupation = this.product.minOccupation;
    product.DimensionId = this.product.dimensionId;
    product.CategoryId = this.product.categoryId;
    product.RestrictionId = this.product.restrictionId;
    this.requestProduct = product;

    this.selectedHeight = this.product.dimension.height.value;
    this.selectedHeightMax = this.product.dimension.height.valueMax;
    this.selectedWidth = this.product.dimension.width.value;
    this.selectedWidthMax = this.product.dimension.width.valueMax;
    this.selectedDepth = this.product.dimension.depth.value;
    this.selectedDepthMax = this.product.dimension.depth.valueMax;

    for (var i = 0; i < this.product.materials.length; i++) {
      for (var j = 0; j < this.product.materials[i].finishes.length; j++) {
        if (!(this.product.materials[i].finishes[j] in this.currentFinishes)) {
          this.currentFinishes.push(this.product.materials[i].finishes[j]);
        }
      }
    }

    this.currentFinishes = Object.values(this.currentFinishes.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {}));

    this.productService.getDotnetMaterials().subscribe(
      (data) => {
        this.availableMaterials = data;
      },
    );


    this.productService.getAllProducts().subscribe((data) => { this.components = data; });

    this.validateMeasurements();
  }

  /**
   * Deletes the product aggregation
   */
  deleteAggregation(): void {

    var p = this.product;

    if (p.components.length > 0) {

      for (var i = 0; i < p.components.length; i++) {

        var child;

        this.productService.getDotNetProductById(p.components[i].id)
          .subscribe(product => child = product,
            () => { },
            () => {
              child.ParentId = null;
              this.productService.editDotnetProduct(child.id, child)
                .subscribe(
                  () => { console.log("Edited " + child.name) },
                  () => { },
                  () => { })
            });
      }
      alert("Product aggregation was successfully deleted.");
      window.location.reload();
    }
    else {

      alert("There is no aggregation to delete.");
    }
  }

  /**
   * Deletes the product and all of its aggregations
   */
  deleteProduct(): void {
    if (this.product.components.length > 0) {
      alert("The product aggregation needs to be deleted first.");
    }
    else {
      this.productService.deleteDotnetProduct(this.route.snapshot.params.id)
        .subscribe(
          data => { alert(data.name + " was deleted.") },
          () => { },
          () => this.router.navigate(['catalog']));
    }

  }

  /**
   * Deletes the measurements of a product.
   */
  deleteMeasurements(): void {
    this.productService.createDotnetDimension(0, 0, 0, 0, 0, 0).subscribe(dimension => {
      this.requestProduct.dimensionId = dimension.id;
      this.productService.editDotnetProduct(this.route.snapshot.params.id, this.requestProduct)
        .subscribe(
          () => { }, () => { }, () => {
            alert("Successfully deleted measures for " + this.product.name + ".");
            window.location.reload();
          })
    });
  }


  /**
   * Edits the measurements of a product with verifications.
   */
  editMeasurement(): void {
    this.productService.createDotnetDimension(
      this.selectedHeight, this.selectedHeightMax,
      this.selectedWidth, this.selectedHeightMax,
      this.selectedDepth, this.selectedDepthMax
    ).subscribe(dimension => {
      this.requestProduct.dimensionId = dimension.id;
      this.productService.editDotnetProduct(this.route.snapshot.params.id, this.requestProduct)
        .subscribe(
          (res) => { },
          () => { },
          () => {
            alert("Successfully edited measures for " + this.product.name + ".");
          })
    });
  }

  validateMeasurements(): void {
    if (this.selectedHeight === null || this.selectedHeightMax === null
      || this.selectedWidth === null || this.selectedWidthMax === null
      || this.selectedDepth === null || this.selectedDepthMax === null) {
      this.validMeasures = false;
    }
    else {

      var validHeight = false;
      var validWidth = false;
      var validDepth = false;


      if ((this.selectedHeight < this.selectedHeightMax)
        || (this.selectedHeight > this.selectedHeightMax && this.selectedHeightMax == 0))
        validHeight = true;
      else
        validHeight = false;

      if ((this.selectedWidth < this.selectedWidthMax)
        || (this.selectedWidth > this.selectedWidthMax && this.selectedWidthMax == 0))
        validWidth = true;
      else
        validWidth = false;

      if ((this.selectedDepth < this.selectedDepthMax)
        || (this.selectedDepth > this.selectedDepthMax && this.selectedDepthMax == 0))
        validDepth = true;
      else
        validDepth = false;


      if (validHeight && validWidth && validDepth) this.validMeasures = true;
      else this.validMeasures = false;

    }
  }


  removeAllMaterial(): void {
    for (var i = 0; i < this.product.materials.length; i++) {
      var material = this.product.materials[i].id;
      this.productService.deleteDotnetMaterial(this.product.id, material).subscribe();
    }
    alert("Deleted all materials.");
    window.location.reload();
  }

  removeMaterial(): void {
    this.productService.deleteDotnetMaterial(this.product.id, this.selectedCurrentMaterial).subscribe(
      () => { alert("Deleted material with ID:" + this.selectedCurrentMaterial); },
      () => { alert("Something went wrong, the material could not be deleted.") },
      () => { window.location.reload(); }
    );
  }

  alreadyAdded: boolean;

  addFinishMaterial(): void {
    if (this.selectedMaterial != undefined) {

      this.alreadyAdded = false;

      for (var i = 0; i < this.product.materials.length; i++) {
        if (this.selectedMaterial == this.product.materials[i].id) {
          this.alreadyAdded = true;
        }
      }

      if (!this.alreadyAdded) {
        this.productService.createDotnetMaterialProduct(this.product.id, this.selectedMaterial).subscribe(
          () => { alert("Successfully added material to product.") },
          () => { alert("Something went wrong, could not add material to product.") },
          () => { window.location.reload() }
        );
      } else {
        alert("Can't add material: Material already exists in product.")
      }
    } else {
      alert("Please select a material first.");
    }
  }

  addComponent(): void {
    console.log(this.selectedComponent);
    console.log(this.product.id);
    this.productService.addDotnetComponent(this.product.id, this.selectedComponent).subscribe(
      () => { alert("Added component with success.") },
      (error) => { alert("Error, something went wrong: Could not add component."); console.log(error); },
      () => { window.location.reload(); }
    );
  }

  setComponent(component: number): void {
    this.selectedComponent = component;
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
  setFinish(finish: any): void {
    this.selectedFinish = finish;
  }
  setCurrentMaterial(material: any): void {
    this.selectedCurrentMaterial = material;
  }

  /**
   * Selects the material and updates the available finishes list
   * @param material the selected material
   */
  setMaterial(material: any): void {
    
    this.availableFinishes = [];
    this.selectedFinish = null;
    this.selectedMaterial = material;

    this.productService.getDotnetMaterialById(material).subscribe(
      (data) => {
        for (var i = 0; i < data.finishes.length; i++) {
          var finish = data.finishes[i];
          if (!(finish in this.availableFinishes)) {
            this.availableFinishes.push(finish);
          }
        }
      }
    );
  }

}
