import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Dimension } from '../model/dimension';
import { DimensionService } from '../dimension.service';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.css']
})
export class DimensionComponent implements OnInit {
  @Input() dimension: Dimension;
  dimensions: Dimension[];

  constructor(
    private dimensionService: DimensionService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {

    this.dimensionService.getDimensions()
      .subscribe(dimensions => this.dimensions = dimensions);
  }

  goBack(): void {
    this.location.back();
  }

  delete(dimension: Dimension): void {
    this.dimensions = this.dimensions.filter(c => c !== dimension);
    this.dimensionService.deleteDimension(dimension).subscribe();
  }
}
