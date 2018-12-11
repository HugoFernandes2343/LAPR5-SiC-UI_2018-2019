import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  add(descricao: string, superCategoria: string, subcategorias: string): void {
    var id = 0;
    for (var i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].id > id) {
        id = this.categorias[i].id;
      }
    }
    id = id + 1;
    descricao = descricao.trim();
    superCategoria = superCategoria.trim();
    subcategorias = subcategorias.trim();
    if (!descricao) { return; }
    if (!id) { return; }
    var subCategorias = subcategorias.split(',');
    if (superCategoria == "") { superCategoria = null};
    if (subCategorias[0] == "") { subCategorias = null};
    this.categoriaService.addCategoria({ id, descricao, superCategoria, subCategorias } as Categoria)
      .subscribe(categoria => {
        if (categoria.id != null) {
          this.categorias.push(categoria);
        }
      });
  }

  delete(categoria: Categoria): void {
    this.categorias = this.categorias.filter(h => h !== categoria);
    this.categoriaService.deleteCategoria(categoria).subscribe();
  }
}
