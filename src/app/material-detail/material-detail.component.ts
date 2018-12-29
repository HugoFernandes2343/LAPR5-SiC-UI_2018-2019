import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Material } from '../model/material';
import { Finishing } from '../model/finishing';
import { MaterialService } from '../material.service';
import { FinishingService } from '../finishing.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  @Input() material: Material;
  finishings: Finishing[];
  selectedFinishing: number;

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private finishingService: FinishingService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMaterial();
    this.getFinishings();
  }

  getFinishings(): any {
    this.finishingService.getFinishings().subscribe(finishings => this.finishings = finishings)
  }

  getMaterial(): void {
    const id = +this.route.snapshot.paramMap.get('materialId');
    this.materialService.getMaterial(id)
      .subscribe(material => this.material = material);
  }

  addFin(): void {
    this.materialService.addFinishing(this.material.materialId, this.selectedFinishing).subscribe(() => window.location.reload());
  }

  delFin(finishingId: number): void {
    this.materialService.removeFinishing(this.material.materialId, finishingId)
      .subscribe(() => window.location.reload());
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.materialService.updateMaterial(this.material)
      .subscribe(() => window.location.reload());
  }
}