import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrderDmDetailComponent } from './consult-order-dm-detail.component';

describe('ConsultOrderDmDetailComponent', () => {
  let component: ConsultOrderDmDetailComponent;
  let fixture: ComponentFixture<ConsultOrderDmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOrderDmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOrderDmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
