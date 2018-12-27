import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../data/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  materials: string = "";
  discreteHeight: boolean;
  discreteDepth: boolean;
  discreteWidth: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location) { }

    ngOnInit() {
      this.getProducts();
    }
  
    getProducts(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.productService.getProductById(id)
      .subscribe(product => this.product = product,
        () => {},
        () => this.getMaterials());
    }

    getMaterials(): void {
      for (var i = 0; i < this.product.prod_materials.length; i++)
      {
        var newString = this.product.prod_materials[i].material_name + ";";
        this.materials += newString;
      }
      this.findDiscreteMeasurements();
    }

    getProductCategory(): string {
      return this.product.prod_category.toString();
    }
  
    goBack(): void {
      this.location.back();
    }  

    compare(name: string): boolean {
      if (name === this.product.prod_name) return true;
      else return false;
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

}
