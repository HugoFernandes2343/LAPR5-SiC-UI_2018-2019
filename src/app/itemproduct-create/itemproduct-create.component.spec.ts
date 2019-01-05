import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemproductCreateComponent } from './itemproduct-create.component';

describe('ItemproductCreateComponent', () => {
  let component: ItemproductCreateComponent;
  let fixture: ComponentFixture<ItemproductCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemproductCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemproductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
