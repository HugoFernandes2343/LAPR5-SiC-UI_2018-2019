import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Encomenda } from '../gerirencomendas/encomenda';
import { GerirencomendasasService } from '../gerirencomendasas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criarencomenda',
  templateUrl: './criarencomenda.component.html',
  styleUrls: ['./criarencomenda.component.css']
})
export class CriarencomendaComponent implements OnInit {

  encomendas: Encomenda[];
  nextId: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private encomendaService: GerirencomendasasService,
    private location: Location) { }

  ngOnInit() {
    this.getEncomendas();
  }

  getEncomendas(): void {
    this.encomendaService.getEncomendas()
      .subscribe(encomendas => {
        this.encomendas = encomendas
        this.nextId = "";
        var nextIdAux: number = 0;
        for (var i = 0; i < this.encomendas.length; i++) {
          var numberId = +this.encomendas[i].encomendaId
          if (numberId > nextIdAux) { nextIdAux = numberId }
        }
        nextIdAux = nextIdAux + 1
        this.nextId = String(nextIdAux);
      });
  }

  goBack(): void {
    this.location.back();
  }

  goItens(): void {
    this.router.navigateByUrl(`encomendar/${this.nextId}`);
  }

  add(name: string, date: string, address: string): void {
    name=name.trim();
    date=date.trim();
    address=address.trim();
    var cost: number = 0;
    var itens: string[] = [];
    var encomendaId = this.nextId;
    if (!name) { return; }
    if (!date) { return; }
    if (!address) { return; }
    this.encomendaService.addEncomenda({encomendaId, name, date, address, cost, itens} as Encomenda)
    .subscribe(() => this.goItens());
  }
}
