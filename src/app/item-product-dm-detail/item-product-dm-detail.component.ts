import { Component, OnInit } from '@angular/core';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrdersService } from '../order.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-item-product-dm-detail',
  templateUrl: './item-product-dm-detail.component.html',
  styleUrls: ['./item-product-dm-detail.component.css']
})
export class ItemProductDmDetailComponent implements OnInit {

  item: ItemProduct;

  constructor(private route: ActivatedRoute,
    private service: OrdersService,
    private location: Location, 
    private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    if(this.userService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.getItemProduct();
  }

  getItemProduct(): void {
    const product = this.route.snapshot.paramMap.get('itemName');
    const idOrder = +this.route.snapshot.paramMap.get('orderId');
    this.service.getItemProduct(idOrder,product)
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

}
