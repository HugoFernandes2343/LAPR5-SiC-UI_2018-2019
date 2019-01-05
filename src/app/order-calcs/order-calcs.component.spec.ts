import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCalcsComponent } from './order-calcs.component';

describe('OrderCalcsComponent', () => {
  let component: OrderCalcsComponent;
  let fixture: ComponentFixture<OrderCalcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCalcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCalcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
