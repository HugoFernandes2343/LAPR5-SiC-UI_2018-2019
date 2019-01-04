import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrderDetailComponent } from './consultorder-detail.component';

describe('ConsultOrderDetailComponent', () => {
  let component: ConsultOrderDetailComponent;
  let fixture: ComponentFixture<ConsultOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
