import { Component, OnInit } from '@angular/core';
import { MaterialAcabamento } from '../materialacabamento/materialacabamento';
import { MaterialacabamentoService } from '../materialacabamento.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-materialacabamento-detail',
  templateUrl: './materialacabamento-detail.component.html',
  styleUrls: ['./materialacabamento-detail.component.css']
})

export class MaterialacabamentoDetailComponent implements OnInit {

  materialAcabamento: MaterialAcabamento;

  constructor(private route: ActivatedRoute,
    private materialAcabamentoService: MaterialacabamentoService,
    private location: Location) { }

  ngOnInit() {
    this.getMaterialAcabamento();
  }

  getMaterialAcabamento(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.materialAcabamentoService.getMaterialAcabamento(id)
      .subscribe(materialAcabamento => this.materialAcabamento = materialAcabamento);
  }

  save(): void {
    var string = this.materialAcabamento.acabamentos.toString();
    this.materialAcabamento.acabamentos = string.split(',');
    this.materialAcabamentoService.updateMaterialAcabamento(this.materialAcabamento)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
