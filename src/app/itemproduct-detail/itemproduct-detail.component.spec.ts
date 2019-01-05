import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemproductDetailComponent } from './itemproduct-detail.component';

describe('ItemproductDetailComponent', () => {
  let component: ItemproductDetailComponent;
  let fixture: ComponentFixture<ItemproductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemproductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemproductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
