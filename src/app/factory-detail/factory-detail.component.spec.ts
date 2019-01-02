import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryDetailComponent } from './factory-detail.component';

describe('FactoryDetailComponent', () => {
  let component: FactoryDetailComponent;
  let fixture: ComponentFixture<FactoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
