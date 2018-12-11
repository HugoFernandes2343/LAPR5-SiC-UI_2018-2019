import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabamentoDetailComponent } from './acabamento-detail.component';

describe('AcabamentoDetailComponent', () => {
  let component: AcabamentoDetailComponent;
  let fixture: ComponentFixture<AcabamentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcabamentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
