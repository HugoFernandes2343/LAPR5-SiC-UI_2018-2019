import { Component, OnInit } from '@angular/core';
import { ItemProduct } from '../model/ItemProduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrdersService } from '../order.service';

@Component({
  selector: 'app-itemproduct-create',
  templateUrl: './itemproduct-create.component.html',
  styleUrls: ['./itemproduct-create.component.css']
})
export class ItemproductCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private service: OrdersService,
    private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  add(nome : string, Altura: string,Largura: string,Profundidade: string,MateriaisAcabamentos: string,Partes: string): void {
    
    if (nome == "" || nome == null) { window.alert("Name is Empty or null"); return; }
    if (Altura == "" || Altura == null) { window.alert("Heigth is Empty or null"); return; }
    if (Largura == "" || Largura == null) { window.alert("Width is Empty or null"); return; }
    if (Profundidade == "" || Profundidade == null) { window.alert("Depth is Empty or null"); return; }
    if (MateriaisAcabamentos == "" || MateriaisAcabamentos == null) { window.alert("Materials and Finishes is Empty or null"); return; }

    const encomendaId = +this.route.snapshot.paramMap.get('id');
    nome.trim(); Altura.trim();Largura.trim();Profundidade.trim();MateriaisAcabamentos.trim();Partes.trim();
    var altura: number = +Altura;
    var largura: number= +Largura;
    var profundidade: number= +Profundidade;

    var listString1 = Partes.split(',');
    if(listString1[0] == ""){
      listString1=[];
    }
    var partesOpcionais: string[] = listString1;

    var string3 = MateriaisAcabamentos;
    var listString3 = string3.split(';');
    if(listString3[0] == ""){
      listString3=[];
    }
    var materiaisAcabamentos : string[] = listString3;
    var custo:number =0;
    var idProduto:string ="";
    var categoria:string ="";
    var partesObrigatorias:string[] =[];

    this.service.addItemProduct({ idProduto, nome , custo, categoria, altura ,largura, profundidade,
    materiaisAcabamentos, partesOpcionais, partesObrigatorias} as ItemProduct, encomendaId)
      .subscribe();
  }
}
