import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicDmDashboardComponent } from './sic-dm-dashboard.component';

describe('SicDmDashboardComponent', () => {
  let component: SicDmDashboardComponent;
  let fixture: ComponentFixture<SicDmDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicDmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicDmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
