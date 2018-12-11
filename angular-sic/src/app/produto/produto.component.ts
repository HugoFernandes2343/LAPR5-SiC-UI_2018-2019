import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {

  produtos: Produto[];
  nextId: number;
  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => {
      this.produtos = produtos
        this.nextId = 0;
        for (var i = 0; i < this.produtos.length; i++) {
          if (this.produtos[i].id > this.nextId) { this.nextId = this.produtos[i].id }
        }
        this.nextId = this.nextId + 1;
      });
  }

  delete(produto: Produto): void {
    this.produtos = this.produtos.filter(h => h !== produto);
    this.produtoService.deleteProduto(produto).subscribe();
  }

}
