import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishingDetailComponent } from './finishing-detail.component';

describe('FinishingDetailComponent', () => {
  let component: FinishingDetailComponent;
  let fixture: ComponentFixture<FinishingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
