import { Component, OnInit } from '@angular/core';
import { Acabamento } from './acabamento';
import { AcabamentoService } from '../acabamento.service';

@Component({
  selector: 'app-acabamento',
  templateUrl: './acabamento.component.html',
  styleUrls: ['./acabamento.component.css']
})
export class AcabamentoComponent implements OnInit {

  acabamentos: Acabamento[];
  constructor(private acabamentoService: AcabamentoService) { }

  ngOnInit() {
    this.getAcabamentos();
  }

  getAcabamentos(): void {
    this.acabamentoService.getAcabamentos()
      .subscribe(acabamentos => this.acabamentos = acabamentos);
  }

  add(descricao: string): void {
    let id = 0;
    for (let i = 0; i < this.acabamentos.length; i++) {
      if (this.acabamentos[i].id > id) { id = this.acabamentos[i].id; }
    }
    id = id + 1;
    descricao = descricao.trim();
    if (!descricao) { return; }
    if (!id) { return; }
    this.acabamentoService.addAcabamento({ id, descricao } as Acabamento)
      .subscribe(acabamento => {
        if (acabamento.id != null) { this.acabamentos.push(acabamento); }
      });
  }

  delete(acabamento: Acabamento): void {
    this.acabamentos = this.acabamentos.filter(h => h !== acabamento);
    this.acabamentoService.deleteAcabamento(acabamento).subscribe();
  }

}
