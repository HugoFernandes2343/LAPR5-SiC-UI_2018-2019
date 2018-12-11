import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarencomendaDetailComponent } from './criarencomenda-detail.component';

describe('CriarencomendaDetailComponent', () => {
  let component: CriarencomendaDetailComponent;
  let fixture: ComponentFixture<CriarencomendaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarencomendaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarencomendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
