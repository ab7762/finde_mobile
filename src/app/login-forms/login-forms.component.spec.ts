import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormsComponent } from './login-forms.component';

describe('LoginFormsComponent', () => {
  let component: LoginFormsComponent;
  let fixture: ComponentFixture<LoginFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormsComponent]
    });
    fixture = TestBed.createComponent(LoginFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
