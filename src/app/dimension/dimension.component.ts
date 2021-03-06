import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Dimension } from '../model/dimension';
import { DimensionService } from '../dimension.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.css']
})
export class DimensionComponent implements OnInit {
  @Input() dimension: Dimension;

  constructor(
    private route: ActivatedRoute,
    private dimensionService: DimensionService,
    private location: Location,
    private router: Router, 
    private usersService: UsersService
  ) {

  }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.getDimension();
  }

  getDimension(): void {

    const id = +this.route.snapshot.paramMap.get('dimensionId');
    this.dimensionService.getDimension(id)
      .subscribe(dimension => this.dimension = dimension);
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    this.dimensionService.deleteDimension(this.dimension).subscribe(() => this.goBack());
  }
}
