import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCustomCreationComponent } from './catalog-custom-creation.component';

describe('CatalogCustomCreationComponent', () => {
  let component: CatalogCustomCreationComponent;
  let fixture: ComponentFixture<CatalogCustomCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogCustomCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCustomCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
