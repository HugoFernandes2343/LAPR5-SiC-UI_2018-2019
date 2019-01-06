import { Component, OnInit, Input } from '@angular/core';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrdersService } from '../order.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Order } from '../model/Order';

@Component({
  selector: 'app-createorder-detail',
  templateUrl: './createorder-detail.component.html',
  styleUrls: ['./createorder-detail.component.css']
})
export class CreateorderDetailComponent implements OnInit {

  @Input() order: Order;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: OrdersService,
    private location: Location,
    private userService: UsersService) { }

  ngOnInit() {
    if (this.userService.getUser() == null) {
      this.router.navigate(['/login']);
    }
  }

  done(): void {
    this.router.navigateByUrl(`/Order`);
  }

  add(nome: string, Altura: string, Largura: string, Profundidade: string, MateriaisAcabamentos: string, Partes: string): void {

    if (nome == "" || nome == null) { window.alert("Name is Empty or null"); return; }
    if (Altura == "" || Altura == null) { window.alert("Heigth is Empty or null"); return; }
    if (Largura == "" || Largura == null) { window.alert("Width is Empty or null"); return; }
    if (Profundidade == "" || Profundidade == null) { window.alert("Depth is Empty or null"); return; }
    if (MateriaisAcabamentos == "" || MateriaisAcabamentos == null) { window.alert("Materials and Finishes is Empty or null"); return; }

    const encomendaId = +this.route.snapshot.paramMap.get('orderId');
    nome.trim(); Altura.trim(); Largura.trim(); Profundidade.trim(); MateriaisAcabamentos.trim(); Partes.trim();
    var altura: number = +Altura;
    var largura: number = +Largura;
    var profundidade: number = +Profundidade;
    var cost: number = +custo;

    var listString1 = Partes.split(',');
    if (listString1[0] == "") {
      listString1 = [];
    }
    var partesOpcionais: string[] = listString1;

    var string3 = MateriaisAcabamentos;
    var listString3 = string3.split(';');
    if (listString3[0] == "") {
      listString3 = [];
    }
    var materiaisAcabamentos: string[] = listString3;
    var custo: number = 0;
    var idProduto: string = "";
    var categoria: string = "";
    var partesObrigatorias: string[] = [];
    var message: string = "";

    this.service.addItemProduct({
      idProduto, nome, custo, categoria, altura, profundidade, largura,
      materiaisAcabamentos, partesOpcionais, partesObrigatorias, message
    } as ItemProduct, encomendaId)
      .subscribe(product => {
        if (product.message != "Item Produto saved!") {
          window.alert(product.message);
        } else {
          window.alert("Item Produto saved!");
        }
      });
  }

  calcCost(Partes: string) {
    var listString1 = Partes.split(',');
    if (listString1[0] == "") {
      listString1 = [];
    }
    var partesOpcionais: string[] = listString1;

  }

}
