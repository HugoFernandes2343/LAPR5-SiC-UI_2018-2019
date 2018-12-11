import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirencomendasItemprodutosCreateComponent } from './gerirencomendas-itemprodutos-create.component';

describe('GerirencomendasItemprodutosCreateComponent', () => {
  let component: GerirencomendasItemprodutosCreateComponent;
  let fixture: ComponentFixture<GerirencomendasItemprodutosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerirencomendasItemprodutosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerirencomendasItemprodutosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
