import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductComponent } from './itemproduct.component';

describe('ItemProductComponent', () => {
  let component: ItemProductComponent;
  let fixture: ComponentFixture<ItemProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
