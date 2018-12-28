import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiCCMDashboardComponent } from './si-c-cm-dashboard.component';

describe('SiCCMDashboardComponent', () => {
  let component: SiCCMDashboardComponent;
  let fixture: ComponentFixture<SiCCMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiCCMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiCCMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
