import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { City } from '../model/city';
import { Factory } from '../model/factory';
import { FactoryService } from '../factory.service'
import { CityService } from '../city.service'
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { stringify } from 'querystring';
import { PrologService } from '../prolog.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.css']
})
export class FactoriesComponent implements OnInit {
  @Input() factory: Factory;
  factories: Factory[];
  cities: City[];
  selectedCity: number;

  constructor(
    private factoryService: FactoryService,
    private prologService: PrologService,
    private cityService: CityService,
    private location: Location,
    private router: Router, 
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.getFactories();
    this.getCities();
    this.initializeFactory();
  }

  getFactories(): void {
    this.factoryService.getFactories()
    .subscribe(factories => this.factories = factories);
  }

  getCities(): void {
    this.cityService.getCities()
    .subscribe(cities => this.cities = cities);
  }

  initializeFactory(){
    this.factory = new Factory();
  }

  save(): void {
    if(this.factory.description === undefined){
      window.alert("Fill the description");
      return;
    }

    
    if(!this.factory.description.trim()){
      window.alert("Fill the description");
      return;
    }

    if(this.selectedCity === undefined || this.selectedCity == null){
      window.alert("Select a City");
      return;
    }

    this.factory.city = this.cities.find(c => c.cityId == this.selectedCity);

    if(this.factory.city.name === undefined){
      window.alert("Choose a city");
      return;
    }

    if(this.factory.city == null){
      window.alert("Chose a city");
      return;
    }
    
    this.factoryService.addFactory(this.factory)
      .subscribe(() => this.prologService.copyFactoryDb().subscribe(() => window.location.reload()));
  }

  reset(): void {
    window.location.reload();
  }

  delete(factory: Factory): void {
    this.factoryService.deleteFactory(factory)
      .subscribe(() => this.prologService.copyFactoryDb().subscribe(() => window.location.reload()));

  }

  goBack(): void {
    this.location.back();
  }
}
