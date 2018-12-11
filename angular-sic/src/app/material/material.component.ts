import { Component, OnInit } from '@angular/core';
import { Material } from './material';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  materials: Material[];
  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials(): void {
    this.materialService.getMaterials()
      .subscribe(materials => this.materials = materials);
  }

  add(descricao: string): void {
    let id = 0;
    for (let i = 0; i < this.materials.length; i++) {
      if (this.materials[i].id > id) { id = this.materials[i].id; }
    }
    id = id + 1;
    descricao = descricao.trim();
    if (!descricao) { return; }
    if (!id) { return; }
    this.materialService.addMaterial({ id, descricao } as Material)
      .subscribe(material => {
        if (material.id != null) { this.materials.push(material); }
      });
  }

  delete(material: Material): void {
    this.materials = this.materials.filter(h => h !== material);
    this.materialService.deleteMaterial(material).subscribe();
  }

}
