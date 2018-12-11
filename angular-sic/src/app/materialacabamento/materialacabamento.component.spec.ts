import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialacabamentoComponent } from './materialacabamento.component';

describe('MaterialacabamentoComponent', () => {
  let component: MaterialacabamentoComponent;
  let fixture: ComponentFixture<MaterialacabamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialacabamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialacabamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
