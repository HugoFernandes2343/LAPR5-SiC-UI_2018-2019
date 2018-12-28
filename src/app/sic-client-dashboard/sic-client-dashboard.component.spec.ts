import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicClientDashboardComponent } from './sic-client-dashboard.component';

describe('SicClientDashboardComponent', () => {
  let component: SicClientDashboardComponent;
  let fixture: ComponentFixture<SicClientDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicClientDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicClientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
