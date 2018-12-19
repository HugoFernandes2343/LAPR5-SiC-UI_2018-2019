import { TestBed, async, inject } from '@angular/core/testing';
import { LoginComponent } from '../model/login/login.component';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ 
        FormsModule, 
        HttpClient 
    ],
      providers: [LoginService]
    }).compileComponents();
  }));

  it('should create the app', async(inject([LoginService], (myService: LoginService) => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  })));
});