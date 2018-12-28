import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Material } from '../model/material';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  @Input() material: Material;
  materials: Material[];

  constructor(
    private materialService: MaterialService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {

    this.materialService.getMaterials()
      .subscribe(materials => this.materials = materials);
  }

  goBack(): void {
    this.location.back();
  }

  delete(material: Material): void {
    this.materials = this.materials.filter(m => m !== material);
    this.materialService.deleteMaterial(material).subscribe();
  }
}