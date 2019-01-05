import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorderDetailComponent } from './createorder-detail.component';

describe('CreateorderDetailComponent', () => {
  let component: CreateorderDetailComponent;
  let fixture: ComponentFixture<CreateorderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateorderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
