import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrderComponent } from './consultorder.component';

describe('ConsultOrderComponent', () => {
  let component: ConsultOrderComponent;
  let fixture: ComponentFixture<ConsultOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
