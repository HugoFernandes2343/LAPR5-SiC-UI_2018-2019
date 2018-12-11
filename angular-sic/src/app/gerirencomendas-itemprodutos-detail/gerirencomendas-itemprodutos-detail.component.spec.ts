import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirencomendasItemprodutosDetailComponent } from './gerirencomendas-itemprodutos-detail.component';

describe('GerirencomendasItemprodutosDetailComponent', () => {
  let component: GerirencomendasItemprodutosDetailComponent;
  let fixture: ComponentFixture<GerirencomendasItemprodutosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerirencomendasItemprodutosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerirencomendasItemprodutosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
