import { Component, OnInit } from '@angular/core';
import { MaterialAcabamento } from './materialacabamento';
import { MaterialacabamentoService } from '../materialacabamento.service';

@Component({
  selector: 'app-materialacabamento',
  templateUrl: './materialacabamento.component.html',
  styleUrls: ['./materialacabamento.component.css']
})
export class MaterialacabamentoComponent implements OnInit {

  materiaisAcabamentos: MaterialAcabamento[];

  constructor(private materialAcabamentoService: MaterialacabamentoService) { }

  ngOnInit() {
    this.getMateriaisAcabamentos();
  }

  getMateriaisAcabamentos(): void {
    this.materialAcabamentoService.getMateriaisAcabamentos()
      .subscribe(materiaisAcabamentos => this.materiaisAcabamentos = materiaisAcabamentos);
  }

  add(material: string, Acabamentos: string): void {
    var id = 0;
    for(var i=0; i<this.materiaisAcabamentos.length;i++){
      if(this.materiaisAcabamentos[i].id>id){ id = this.materiaisAcabamentos[i].id}
    }
    id = id + 1;
    material = material.trim();
    Acabamentos = Acabamentos.trim();
    if (!material) { return; }
    if (!Acabamentos) { return; }
    const acabamentos = Acabamentos.split(',');
    this.materialAcabamentoService.addMaterialAcabamento({ id, material, acabamentos } as MaterialAcabamento)
      .subscribe(materialAcabamento => {
        this.getMateriaisAcabamentos()
      });
  }

  delete(materialAcabamento: MaterialAcabamento): void {
    this.materiaisAcabamentos = this.materiaisAcabamentos.filter(h => h !== materialAcabamento);
    this.materialAcabamentoService.deleteMaterialAcabamento(materialAcabamento).subscribe();
  }

}
