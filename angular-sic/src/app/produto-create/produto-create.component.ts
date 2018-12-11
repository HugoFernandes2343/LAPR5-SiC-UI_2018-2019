import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../produto/produto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private location: Location) { }

  ngOnInit() {
  }

  add(nome : string, categoria: string,Preco: string,Altura: string,AlturaMax: string,AlturaMin: string,
    Largura: string,LarguraMax: string,LarguraMin: string,Profundidade: string,ProfundidadeMax: string,ProfundidadeMin: string,
    MaxTaxaOcupacao: string,RestrigirMateriais: string,MateriaisAcabamentos: string,Opcional: string,Obrigatoria: string): void {
    
    var taxaOcupacaoAtual: number = 0;
    var id : number = +this.route.snapshot.paramMap.get('id');
    nome.trim(); categoria.trim();MateriaisAcabamentos.trim();Opcional.trim();Obrigatoria.trim();
    var preco: number = +Preco;
    var altura: number = +Altura;
    var alturaMax: number= +AlturaMax;
    var alturaMin: number= +AlturaMin;
    var largura: number= +Largura;
    var larguraMax: number= +LarguraMax;
    var larguraMin: number= +LarguraMin;
    var profundidade: number= +Profundidade;
    var profundidadeMax: number= +ProfundidadeMax;
    var profundidadeMin: number= +ProfundidadeMin;
    var maxTaxaOcupacao: number= +MaxTaxaOcupacao;

    var listString1 = Opcional.split(',');
    if(listString1[0] == ""){
      listString1=[];
    }
    var opcional: string[] = listString1;

    var string2 = Obrigatoria;
    var listString2 = string2.split(',');
    if(listString2[0] == ""){
      listString2=[];
    }
    var obrigatoria: string[] = listString2;

    var string3 = MateriaisAcabamentos;
    var listString3 = string3.split(';');
    if(listString3[0] == ""){
      listString3=[];
    }
    var materiaisAcabamentos : string[] = listString3;

    var restrigirMateriais : boolean;
    if(RestrigirMateriais == "true"){
      restrigirMateriais = true;
    }else{
      restrigirMateriais = false;
    }

    this.produtoService.addProduto({ id, nome , categoria, preco, altura ,alturaMax, alturaMin,
      largura, larguraMax, larguraMin, profundidade, profundidadeMax, profundidadeMin,
      maxTaxaOcupacao, taxaOcupacaoAtual, restrigirMateriais, materiaisAcabamentos, opcional, obrigatoria } as Produto)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
