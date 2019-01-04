import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PriceService } from '../price.service';
import { Price } from '../model/price';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.css']
})
export class PriceDetailComponent implements OnInit {
  @Input() price: Price;

  constructor(
    private route: ActivatedRoute,
    private priceService: PriceService,
    private location: Location,
    private router: Router, 
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.getPrice();
  }

  getPrice(): void {
    const id = +this.route.snapshot.paramMap.get('priceId');
    this.priceService.getPrice(id)
      .subscribe(price => this.price = price);
  }

  save(): void {
    this.priceService.updatePrice(this.price)
      .subscribe(() => window.location.reload());
  }

  goBack(): void {
    this.location.back();
  }

}
