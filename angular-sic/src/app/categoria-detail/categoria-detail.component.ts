import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../categoria/categoria';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriaService }  from '../categoria.service';


@Component({
  selector: 'app-categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.css']
})
export class CategoriaDetailComponent implements OnInit {

  categoria: Categoria;

  constructor(private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private location: Location) { }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriaService.getCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }

  save(): void {
    var string = this.categoria.subCategorias.toString();
    this.categoria.subCategorias = string.split(',');
    if (this.categoria.superCategoria == "") { this.categoria.superCategoria = null};
    if (this.categoria.subCategorias[0] == "") { this.categoria.subCategorias = null};
    this.categoriaService.updateCategoria(this.categoria)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
