import { Component, OnInit } from '@angular/core';
import { Item } from '../gerirencomendas-detail/item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GerirencomendasasService } from '../gerirencomendasas.service';

@Component({
  selector: 'app-gerirencomendas-itemprodutos-create',
  templateUrl: './gerirencomendas-itemprodutos-create.component.html',
  styleUrls: ['./gerirencomendas-itemprodutos-create.component.css']
})
export class GerirencomendasItemprodutosCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private encomendaService: GerirencomendasasService,
    private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  add(nome : string, Altura: string,Largura: string,Profundidade: string,MateriaisAcabamentos: string,Partes: string): void {
    
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

    this.encomendaService.addItemProduto({ idProduto, nome , custo, categoria, altura ,largura, profundidade,
    materiaisAcabamentos, partesOpcionais, partesObrigatorias} as Item, encomendaId)
      .subscribe(() => this.goBack());
  }

}
