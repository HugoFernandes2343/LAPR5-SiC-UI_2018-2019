import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirencomendasDetailComponent } from './gerirencomendas-detail.component';

describe('GerirencomendasDetailComponent', () => {
  let component: GerirencomendasDetailComponent;
  let fixture: ComponentFixture<GerirencomendasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerirencomendasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerirencomendasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
