import { Component, OnInit } from '@angular/core';
import { Factory } from '../model/factory'
import { FactoryService } from '../factory.service'
import { CityService } from '../city.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-calcs',
  templateUrl: './order-calcs.component.html',
  styleUrls: ['./order-calcs.component.css']
})
export class OrderCalcsComponent implements OnInit {

  factories: Factory[];

  constructor(
    private factoryService: FactoryService,
    private cityService: CityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getFactories();
  }

  getFactories(): void {
    this.factoryService.getFactories()
    .subscribe(factories => this.factories = factories);
  }

  calculation(factory: Factory): void {
    
  }
}
