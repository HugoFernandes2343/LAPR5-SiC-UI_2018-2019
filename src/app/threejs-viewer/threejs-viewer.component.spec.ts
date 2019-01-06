import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsViewerComponent } from './threejs-viewer.component';

describe('ThreejsViewerComponent', () => {
  let component: ThreejsViewerComponent;
  let fixture: ComponentFixture<ThreejsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreejsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreejsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
