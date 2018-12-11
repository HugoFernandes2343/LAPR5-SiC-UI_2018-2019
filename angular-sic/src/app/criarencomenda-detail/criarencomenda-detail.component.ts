import { Component, OnInit } from '@angular/core';
import { Item } from '../gerirencomendas-detail/item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GerirencomendasasService } from '../gerirencomendasas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criarencomenda-detail',
  templateUrl: './criarencomenda-detail.component.html',
  styleUrls: ['./criarencomenda-detail.component.css']
})
export class CriarencomendaDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private encomendaService: GerirencomendasasService,
    private location: Location) { }

  ngOnInit() {
  }

  done(): void {
    this.router.navigateByUrl(`/encomendas`);
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
      .subscribe();
  }

}
