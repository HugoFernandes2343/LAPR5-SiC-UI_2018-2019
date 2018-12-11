import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarencomendaComponent } from './criarencomenda.component';

describe('CriarencomendaComponent', () => {
  let component: CriarencomendaComponent;
  let fixture: ComponentFixture<CriarencomendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarencomendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarencomendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
