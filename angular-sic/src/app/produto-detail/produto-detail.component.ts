import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../produto/produto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.css']
})
export class ProdutoDetailComponent implements OnInit {

  produto: Produto;

  constructor(private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private location: Location) { }

  ngOnInit() {
    this.getProduto();
  }

  getProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id)
      .subscribe(produto => this.produto = produto);
  }

  deletePartes(): void {
    this.produto.opcional = [];
    this.produto.obrigatoria = [];
    this.save();
  }

  deleteDimensoes(): void {
    this.produto.largura = 0;
    this.produto.larguraMax = 0;
    this.produto.larguraMin = 0;
    this.produto.profundidade = 0;
    this.produto.profundidadeMax = 0;
    this.produto.profundidadeMin = 0;
    this.produto.altura = 0;
    this.produto.alturaMax = 0;
    this.produto.alturaMin = 0;
    this.deletePartes();
  }

  save(): void {
    var string1 = this.produto.opcional.toString();
    var listString1 = string1.split(',');
    if(listString1[0] == ""){
      listString1=[];
    }
    this.produto.opcional = listString1;
    var string2 = this.produto.obrigatoria.toString();
    var listString2 = string2.split(',');
    if(listString2[0] == ""){
      listString2=[];
    }
    this.produto.obrigatoria = listString2;

    var string3 = this.produto.materiaisAcabamentos.toString();
    var listString3 = string3.split(';');
    if(listString3[0] == ""){
      listString3=[];
    }
    this.produto.materiaisAcabamentos = listString3;

    var bol : string = String(this.produto.restrigirMateriais);

    if(bol == "true"){
      this.produto.restrigirMateriais = true;
    }else{
      this.produto.restrigirMateriais = false;
    }
    
    this.produtoService.updateProduto(this.produto)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
