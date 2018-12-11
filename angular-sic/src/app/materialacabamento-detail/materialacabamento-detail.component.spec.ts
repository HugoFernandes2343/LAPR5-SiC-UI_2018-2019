import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialacabamentoDetailComponent } from './materialacabamento-detail.component';

describe('MaterialacabamentoDetailComponent', () => {
  let component: MaterialacabamentoDetailComponent;
  let fixture: ComponentFixture<MaterialacabamentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialacabamentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialacabamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
