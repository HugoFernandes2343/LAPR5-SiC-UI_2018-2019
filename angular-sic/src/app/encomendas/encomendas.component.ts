import { Component, OnInit } from '@angular/core';
import { Opcao } from './opcaoEncomenda';

const OPCOES: Opcao[] = [
  { id: 1, name: 'gerirencomendas' },
  { id: 2, name: 'encomendar' }
];

@Component({
  selector: 'app-encomendas',
  templateUrl: './encomendas.component.html',
  styleUrls: [ './encomendas.component.css' ]
})

export class EncomendasComponent implements OnInit {
  opcoes = [];

  constructor() { }

  ngOnInit() {
    this.opcoes = OPCOES;
  }
}
