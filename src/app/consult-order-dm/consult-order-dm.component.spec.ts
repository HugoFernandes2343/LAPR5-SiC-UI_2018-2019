import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrderDmComponent } from './consult-order-dm.component';

describe('ConsultOrderDmComponent', () => {
  let component: ConsultOrderDmComponent;
  let fixture: ComponentFixture<ConsultOrderDmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOrderDmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOrderDmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
