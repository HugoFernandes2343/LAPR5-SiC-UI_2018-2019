import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirencomendasComponent } from './gerirencomendas.component';

describe('GerirencomendasComponent', () => {
  let component: GerirencomendasComponent;
  let fixture: ComponentFixture<GerirencomendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerirencomendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerirencomendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
