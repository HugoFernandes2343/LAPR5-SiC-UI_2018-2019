import { Component, OnInit, Input } from '@angular/core';
import { Material } from '../material/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialService } from '../material.service';


@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {

  material: Material;

  constructor(private route: ActivatedRoute,
    private materialService: MaterialService,
    private location: Location) { }

  ngOnInit() {
    this.getMaterial();
  }

  getMaterial(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.materialService.getMaterial(id)
      .subscribe(material => this.material = material);
  }

  save(): void {
    this.materialService.updateMaterial(this.material)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
