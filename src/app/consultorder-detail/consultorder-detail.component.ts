import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { ProductService } from '../product.service';
import { Dimension } from '../model/dimension';
import { Material } from '../model/material';
import { Finishing } from '../model/finishing';
import { ShareService } from '../share.service';
import { Measure } from '../model/measure';
import { DimensionService } from '../dimension.service';
import { MaterialService } from '../material.service';
import { ConsultOrderService } from '../consultorder.service';


@Component({
  selector: 'app-consultorder-detail',
  templateUrl: './consultorder-detail.component.html',
  styleUrls: ['./consultorder-detail.component.css']
})

export class ConsultOrderDetailComponent implements OnInit {
  @Input() order: Order;
  @Input() product: Product;
  @Input() dim: Dimension;
  @Input() mat: Material;
  @Input() mat_type: string;
  materials: Material[];
  selectedMaterial: number;

  constructor(
    private route: ActivatedRoute,
	private orderService: ConsultOrderService,
    private productService: ProductService,
    private dimensionService: DimensionService,
    private materialService: MaterialService,
    private location: Location,
    private share: ShareService
  ) { }

  ngOnInit(): void {
  this.getOrder();
    this.getOrder();
	this.getProduct();
    this.getMaterials();
    this.initializeDim();
    this.initializeMat();
  }

  getMaterials(): any {
    this.materialService.getMaterials().subscribe(materials => this.materials = materials)
  }

  initializeDim(): any {
    this.dim = new Dimension;
    this.dim.depth = new Measure;
    this.dim.height = new Measure;
    this.dim.width = new Measure;
  }
  initializeMat(): any {
    this.mat = new Material;
    this.mat.finishes = [];
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('productId');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }
  
  getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('orderId');
    this.orderService.getOrder(id)
      .subscribe(order => this.order = order);
  }

  addDim(): void {
    if (this.dim.depth.value == null || this.dim.depth.value <= 0.0) {
      this.initializeDim();
      window.alert("Depth has invalid value");
      return
    }

    if (this.dim.height.value == null || this.dim.height.value <= 0.0) {
      this.initializeDim();
      window.alert("Height has invalid value");
      return
    }

    if (this.dim.width.value == null || this.dim.width.value <= 0.0) {
      this.initializeDim();
      window.alert("Width has invalid value");
      return;
    }

    if (this.dim.depth.valueMax == null) {
      this.dim.depth.valueMax = 0;
    } else if (this.dim.depth.value >= this.dim.depth.valueMax) {
      this.initializeDim();
      window.alert("Max Depth must be bigger than Depth or non-existent");
      return
    }

    if (this.dim.height.valueMax == null) {
      this.dim.height.valueMax = 0;
    } else if (this.dim.height.value >= this.dim.height.valueMax) {
      this.initializeDim();
      window.alert("Max Height must be bigger than Height or non-existent");
      return
    }

    if (this.dim.width.valueMax == null) {
      this.dim.width.valueMax = 0;
    } else if (this.dim.width.value >= this.dim.width.valueMax) {
      this.initializeDim();
      window.alert("Max Width must be bigger than Width or non-existent");
      return
    }

    this.dimensionService.addDimension(this.dim)
      .subscribe(dimension => this.productService.addDimension(this.product.productId, dimension.dimensionId)
        .subscribe(() => window.location.reload()));
  }

  addMat(): void {
    this.productService.addMaterial(this.product.productId, this.selectedMaterial).subscribe(() => window.location.reload());
  }

  delMat(materialId: number): void {
    this.productService.removeMaterial(this.product.productId, materialId)
      .subscribe(() => window.location.reload());
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.orderService.updateOrder(this.order)
      .subscribe(() => window.location.reload());
  }
}