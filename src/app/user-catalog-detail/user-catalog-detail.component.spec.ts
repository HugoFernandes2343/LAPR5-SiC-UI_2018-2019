import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatalogDetailComponent } from './user-catalog-detail.component';

describe('UserCatalogDetailComponent', () => {
  let component: UserCatalogDetailComponent;
  let fixture: ComponentFixture<UserCatalogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCatalogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCatalogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
