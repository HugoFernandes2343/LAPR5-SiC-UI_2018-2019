import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Material } from '../model/material';
import { MaterialService } from '../material.service';
import { windowTime } from 'rxjs/operators';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  @Input() mat: Material;
  materials: Material[];

  constructor(
    private materialService: MaterialService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.displayList();
    this.initializeMaterial();
  }

  displayList(): void {

    this.materialService.getMaterials()
      .subscribe(materials => this.materials = materials);
  }

  initializeMaterial(): any {
    this.mat= new Material();
  }

  save(): void {
    this.mat.name = this.mat.name.trim();
    if (!this.mat.name) { return; }

    this.mat.description = this.mat.description.trim();
    if (!this.mat.description) { return; }

    this.materialService.addMaterial(this.mat).subscribe(() => window.location.reload());
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  delete(material: Material): void {
    this.materials = this.materials.filter(m => m !== material);
    this.materialService.deleteMaterial(material).subscribe();
  }
}