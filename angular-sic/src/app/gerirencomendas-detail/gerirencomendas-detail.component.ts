import { Component, OnInit, Input } from '@angular/core';
import { Encomenda } from '../gerirencomendas/encomenda';
import { Item } from './item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GerirencomendasasService } from '../gerirencomendasas.service';

@Component({
  selector: 'app-gerirencomendas-detail',
  templateUrl: './gerirencomendas-detail.component.html',
  styleUrls: ['./gerirencomendas-detail.component.css']
})
export class GerirencomendasDetailComponent implements OnInit {

  encomenda: Encomenda;
  itens: Item[];

  constructor(private route: ActivatedRoute,
    private encomendaService: GerirencomendasasService,
    private location: Location) { }

  ngOnInit() {
    this.getEncomenda();
  }

  getEncomenda(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.encomendaService.getEncomenda(id)
      .subscribe(encomenda => {
        this.encomenda = encomenda;
        const id = +this.route.snapshot.paramMap.get('id');
        this.encomendaService.getEncomendaItens(id)
          .subscribe(itens => {
            this.itens = itens;
          });
      });
  }

  delete(item: Item): void {
    this.itens = this.itens.filter(h => h !== item);
    const index = this.encomenda.itens.indexOf(item.nome, 0);
    if (index > -1) {
      this.encomenda.itens.splice(index, 1);
   }
    this.encomendaService.deleteItemFromEncomenda(item,this.encomenda).subscribe();
  }

  save(): void {
    this.encomendaService.updateEncomendaDetails(this.encomenda)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
