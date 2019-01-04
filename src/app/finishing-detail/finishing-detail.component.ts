import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Finishing } from '../model/finishing';
import { FinishingService } from '../finishing.service';
import { Price } from '../model/price';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-finishing-detail',
  templateUrl: './finishing-detail.component.html',
  styleUrls: ['./finishing-detail.component.css']
})
export class FinishingDetailComponent implements OnInit {
  @Input() finishing: Finishing;
  @Input() value: number;
  @Input() date: Date;
  price: Price;
  prices: Price[];
  finishings: Finishing[];

  constructor(
    private route: ActivatedRoute,
    private finishingService: FinishingService,
    private priceService: PriceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getFinishing();
  }

  getFinishing(): void {
    const id = +this.route.snapshot.paramMap.get('finishingId');
    this.finishingService.getFinishing(id)
      .subscribe(finishing => { this.finishing = finishing, this.getPrices() });
  }

  getPrices(): any {
    this.priceService.getPricesByEntity(this.finishing.name).subscribe(prices => this.prices = prices);
  }

  reset(): void {
    window.location.reload();
  }

  addPrice(): void {
    if (this.value == null) { return; }
    this.price = new Price();
    this.price.price = this.value;
    this.price.designation = this.finishing.name;
    this.price.dateTime = this.date;

    this.priceService.addPrice(this.price).subscribe(() => window.location.reload());

  }

  delPrice(priceId: number): void {
    this.priceService.deletePrice(priceId)
      .subscribe(() => window.location.reload());
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.finishingService.updateFinishing(this.finishing)
      .subscribe(() => window.location.reload());
  }
}