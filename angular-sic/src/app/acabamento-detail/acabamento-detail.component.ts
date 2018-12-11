import { Component, OnInit, Input } from '@angular/core';
import { Acabamento } from '../acabamento/acabamento';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AcabamentoService } from '../acabamento.service';


@Component({
  selector: 'app-acabamento-detail',
  templateUrl: './acabamento-detail.component.html',
  styleUrls: ['./acabamento-detail.component.css']
})
export class AcabamentoDetailComponent implements OnInit {

  acabamento: Acabamento;

  constructor(private route: ActivatedRoute,
    private acabamentoService: AcabamentoService,
    private location: Location) { }

  ngOnInit() {
    this.getAcabamento();
  }

  getAcabamento(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.acabamentoService.getAcabamento(id)
      .subscribe(acabamento => this.acabamento = acabamento);
  }

  save(): void {
    this.acabamentoService.updateAcabamento(this.acabamento)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
