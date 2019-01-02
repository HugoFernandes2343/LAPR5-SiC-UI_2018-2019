import { Component, OnInit, Input } from '@angular/core';
import { Factory } from '../model/factory';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FactoryService } from '../factory.service'

@Component({
  selector: 'app-factory-detail',
  templateUrl: './factory-detail.component.html',
  styleUrls: ['./factory-detail.component.css']
})
export class FactoryDetailComponent implements OnInit {
  @Input() factory: Factory;

  constructor(
    private route: ActivatedRoute,
    private factoryService: FactoryService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getFactory();
  }

  getFactory(): void {
    const id = +this.route.snapshot.paramMap.get('factoryId');
    this.factoryService.getFactory(id)
      .subscribe(factory => this.factory = factory);
  }

  reset(): void {
    window.location.reload();
  }

  save(): void {
    this.factoryService.updateFactory(this.factory)
      .subscribe(() => window.location.reload());
  }
}
