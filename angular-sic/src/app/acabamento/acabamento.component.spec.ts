import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabamentoComponent } from './acabamento.component';

describe('AcabamentoComponent', () => {
  let component: AcabamentoComponent;
  let fixture: ComponentFixture<AcabamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcabamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
