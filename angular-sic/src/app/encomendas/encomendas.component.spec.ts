import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomendasComponent } from './encomendas.component';

describe('EncomendasComponent', () => {
  let component: EncomendasComponent;
  let fixture: ComponentFixture<EncomendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncomendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncomendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
