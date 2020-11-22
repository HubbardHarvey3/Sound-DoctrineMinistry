import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { MatMenuModule } from '@angular/material/menu';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatMenuModule],
      declarations: [
        AppComponent
      ],
      providers: [ApiService, AuthService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = AppComponent;
    expect(app).toBeTruthy();
  });


});
