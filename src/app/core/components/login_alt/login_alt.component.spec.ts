import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAltComponent } from './login_alt.component';

describe('LoginComponent', () => {
  let component: LoginAltComponent;
  let fixture: ComponentFixture<LoginAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
