import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Material } from '../model/material';
import { Finishing } from '../model/finishing';
import { MaterialService } from '../material.service';
import { FinishingService } from '../finishing.service';
import { Price } from '../model/price';
import { PriceService } from '../price.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  @Input() material: Material;
  @Input() value: number;
  @Input() date: string;
  price: Price;
  finishings: Finishing[];
  prices: Price[];
  selectedFinishing: number;

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private finishingService: FinishingService,
    private priceService: PriceService,
    private location: Location,
    private router: Router, 
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.getMaterial();
    this.getFinishings();
  }

  getFinishings(): any {
    this.finishingService.getFinishings().subscribe(finishings => this.finishings = finishings);
  }

  getPrices(): any {
    this.priceService.getPricesByEntity(this.material.name).subscribe(prices => this.prices = prices);
  }

  getMaterial(): void {
    const id = +this.route.snapshot.paramMap.get('materialId');
    this.materialService.getMaterial(id)
      .subscribe(material => { this.material = material, this.getPrices() });
  }

  addFin(): void {
    this.materialService.addFinishing(this.material.materialId, this.selectedFinishing).subscribe(() => window.location.reload());
  }

  delFin(finishingId: number): void {
    this.materialService.removeFinishing(this.material.materialId, finishingId)
      .subscribe(() => window.location.reload());
  }

  addPrice(): void {
    if (this.value == null) { return; }
    this.price = new Price();
    var today = new Date();
    if(this.value == null || this.value < 0.0){
      return window.alert("Insira um valor válido");
    }
    
    if(this.date == null){
      return window.alert("Insira uma data no formato AAAA-MM-DD");
    }
    
    if(Number(this.date.substring(0,4)) < today.getFullYear()-1 ){
      return window.alert("Ano inválido");
    } else if(Number(this.date.substring(5,7)) < 1 || Number(this.date.substring(5,7)) > 12) {
      return window.alert("Mês inválido");
    } else if(Number(this.date.substring(8,10)) < 1 || Number(this.date.substring(8,10)) > 31) {
      return window.alert("Dia inválido");
    } else {
      this.price.price = this.value;
      this.price.designation = this.material.name;
      this.price.date = this.date.substring(0,4).concat("-").concat(this.date.substring(5,7)).concat("-").concat(this.date.substring(8,10));
      this.priceService.addPrice(this.price).subscribe(() => window.location.reload());
    }

  }

  delPrice(priceId: number): void {
    this.priceService.deletePrice(priceId)
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