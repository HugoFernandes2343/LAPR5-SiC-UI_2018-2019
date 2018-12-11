import { Component, OnInit } from '@angular/core';
import { Encomenda } from './encomenda';
import { GerirencomendasasService } from '../gerirencomendasas.service';

@Component({
  selector: 'app-gerirencomendas',
  templateUrl: './gerirencomendas.component.html',
  styleUrls: ['./gerirencomendas.component.css']
})
export class GerirencomendasComponent implements OnInit {

  encomendas: Encomenda[];

  constructor(private encomendaService: GerirencomendasasService) { }

  ngOnInit() {
    this.getEncomendas();
  }

  getEncomendas(): void {
    this.encomendaService.getEncomendas()
      .subscribe(encomendas => {
      this.encomendas = encomendas
      });
  }

  delete(encomenda: Encomenda): void {
    this.encomendas = this.encomendas.filter(h => h !== encomenda);
    this.encomendaService.deleteEncomenda(encomenda).subscribe();
  }

}
