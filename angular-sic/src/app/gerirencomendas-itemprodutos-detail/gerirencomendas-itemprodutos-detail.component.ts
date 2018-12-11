import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../gerirencomendas-detail/item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GerirencomendasasService } from '../gerirencomendasas.service';

@Component({
  selector: 'app-gerirencomendas-itemprodutos-detail',
  templateUrl: './gerirencomendas-itemprodutos-detail.component.html',
  styleUrls: ['./gerirencomendas-itemprodutos-detail.component.css']
})
export class GerirencomendasItemprodutosDetailComponent implements OnInit {

  item: Item;

  constructor(private route: ActivatedRoute,
    private encomendaService: GerirencomendasasService,
    private location: Location) { }

  ngOnInit() {
    this.getItemProduto();
  }

  getItemProduto(): void {
    const idProduto = +this.route.snapshot.paramMap.get('idItem');
    const idEncomenda = +this.route.snapshot.paramMap.get('id');
    this.encomendaService.getItemProduto(idEncomenda,idProduto)
      .subscribe(item => this.item = item);
  }

  deletePartes(): void {
    this.item.partesOpcionais = [];
    this.save();
  }

  save(): void {
    var string1 = this.item.partesOpcionais.toString();
    var listString1 = string1.split(',');
    if(listString1[0] == ""){
      listString1=[];
    }
    this.item.partesOpcionais = listString1;
    var string2 = this.item.partesObrigatorias.toString();
    var listString2 = string2.split(',');
    if(listString2[0] == ""){
      listString2=[];
    }
    this.item.partesObrigatorias = listString2;

    var string3 = this.item.materiaisAcabamentos.toString();
    var listString3 = string3.split(';');
    if(listString3[0] == ""){
      listString3=[];
    }
    this.item.materiaisAcabamentos = listString3;
    
    const idProduto = +this.route.snapshot.paramMap.get('idItem');
    const idEncomenda = +this.route.snapshot.paramMap.get('id');
    this.encomendaService.updateItemProduto(idEncomenda, idProduto, this.item)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
