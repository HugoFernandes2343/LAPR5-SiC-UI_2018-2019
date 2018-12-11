import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../produto/produto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-partes',
  templateUrl: './produto-partes.component.html',
  styleUrls: ['./produto-partes.component.css']
})
export class ProdutoPartesComponent implements OnInit {

  partes: Produto[];

  constructor(private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private location: Location) { }

  ngOnInit() {
    this.getPartes();
  }

  getPartes(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getPartes(id)
      .subscribe(produtos => this.partes = produtos);
  }

  goBack(): void {
    this.location.back();
  }

}
