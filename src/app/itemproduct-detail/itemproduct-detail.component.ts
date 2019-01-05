import { Component, OnInit } from '@angular/core';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrdersService } from '../order.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-itemproduct-detail',
  templateUrl: './itemproduct-detail.component.html',
  styleUrls: ['./itemproduct-detail.component.css']
})
export class ItemproductDetailComponent implements OnInit {

  item: ItemProduct;

  constructor(private route: ActivatedRoute,
    private service: OrdersService,
    private location: Location,
    private router: Router, 
    private userService: UsersService) { }

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

  save(): void {

    if (this.item.nome == "" || this.item.nome == null) { window.alert("Name is Empty or null"); return; }
    if (this.item.altura == 0 || this.item.altura == null) { window.alert("Heigth is 0 or null"); return; }
    if (this.item.largura == 0 || this.item.largura == null) { window.alert("Width is 0 or null"); return; }
    if (this.item.profundidade == 0 || this.item.profundidade == null) { window.alert("Depth is 0 or null"); return; }
    if (this.item.materiaisAcabamentos == [] || this.item.materiaisAcabamentos == null) { window.alert("Materials and Finishes is Empty or null"); return; }

    var string1 = this.item.partesOpcionais.toString();
    var listString1 = string1.split(',');
    if(listString1[0] == ""){
      listString1=[];
    }
    this.item.partesOpcionais = listString1;

    var string3 = this.item.materiaisAcabamentos.toString();
    var listString3 = string3.split(';');
    if(listString3[0] == ""){
      listString3=[];
    }
    this.item.materiaisAcabamentos = listString3;

    const product = this.route.snapshot.paramMap.get('itemName');
    const idOrder = +this.route.snapshot.paramMap.get('orderId');
    this.service.updateItemProduct(idOrder, product, this.item)
      .subscribe(product => {
        if (product.message != "Item Produto updated!") {
          window.alert(product.message);
          this.getItemProduct();
        } else {
          window.alert("Item Produto updated!");
          this.goBack();
        }
      });

  }
}
