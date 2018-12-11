import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoPartesComponent } from './produto-partes.component';

describe('ProdutoPartesComponent', () => {
  let component: ProdutoPartesComponent;
  let fixture: ComponentFixture<ProdutoPartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoPartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
