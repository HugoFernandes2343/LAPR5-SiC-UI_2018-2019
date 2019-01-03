import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Price } from '../model/price';
import { PriceService } from '../price.service';
import { isNull } from 'util';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  @Input() pr: Price;
  prices: Price[];

  constructor(
    private priceService: PriceService,
    private location: Location
  ) { 
    
  }

  ngOnInit() {
    this.displayList();
    this.initializePrice();
  }

  displayList(): void {

    this.priceService.getPrices()
      .subscribe(prices => this.prices = prices);
  }

  goBack(): void {
    this.location.back();
  }

  initializePrice(): any {
    this.pr = new Price();
  }

  addPrice(): void {
    this.pr.designation = this.pr.designation.trim();
    if (!this.pr.designation) { return; }

    if (this.pr.price == null) { return; }

    if (this.pr.dateTime == null) { return; }

    this.priceService.addPrice(this.pr)
    .subscribe(() => window.location.reload());
  }

  delete(price: Price): void {
    this.prices = this.prices.filter(p => p !== price);
    this.priceService.deletePrice(price).subscribe();
  }

}
