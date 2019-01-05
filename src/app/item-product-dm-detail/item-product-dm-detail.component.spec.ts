import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductDmDetailComponent } from './item-product-dm-detail.component';

describe('ItemProductDmDetailComponent', () => {
  let component: ItemProductDmDetailComponent;
  let fixture: ComponentFixture<ItemProductDmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemProductDmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductDmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
