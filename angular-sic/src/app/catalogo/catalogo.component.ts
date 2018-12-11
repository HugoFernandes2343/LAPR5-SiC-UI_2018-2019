import { Component, OnInit } from '@angular/core';
import { Opcao } from './opcaoCatalogo';

const OPCOES: Opcao[] = [
  { id: 1, name: 'material' },
  { id: 2, name: 'acabamento' },
  { id: 3, name: 'categoria' },
  { id: 4, name: 'materialacabamento' },
  { id: 5, name: 'produto' }
];

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: [ './catalogo.component.css' ]
})

export class CatalogoComponent implements OnInit {
  opcoes = [];

  constructor() { }

  ngOnInit() {
    this.opcoes = OPCOES;
  }
}
