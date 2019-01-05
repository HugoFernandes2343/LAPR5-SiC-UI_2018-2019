import { Component, OnInit } from '@angular/core';
import { Factory } from '../model/factory'
import { FactoryService } from '../factory.service'
import { CityService } from '../city.service'
import { Location } from '@angular/common';
import { PrologService } from '../prolog.service';
import { City } from '../model/city'

@Component({
  selector: 'app-order-calcs',
  templateUrl: './order-calcs.component.html',
  styleUrls: ['./order-calcs.component.css']
})
export class OrderCalcsComponent implements OnInit {

  factories: Factory[];
  citiesIds: any[] | string;
  cities: City[];
  factory: Factory;

  constructor(
    private factoryService: FactoryService,
    private cityService: CityService,
    private prologService: PrologService,
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
    this.factory = factory;
    this.prologService.shorterPath(factory.city.name.replace(" ","+")).subscribe(c => this.citiesIds = c);
    this.makeCalculations();
  }

  makeCalculations(): void{
    window.alert(this.citiesIds);
    this.cities = new Array(50);
    for(var _i = 0; _i < this.citiesIds.length; _i++){
      this.cityService.getCity(this.citiesIds[_i]).subscribe(c => this.cities[_i] = c);
    }
    window.alert(this.cities[0].name);
  }
}
