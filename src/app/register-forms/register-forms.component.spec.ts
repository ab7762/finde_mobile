import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormsComponent } from './register-forms.component';

describe('RegisterFormsComponent', () => {
  let component: RegisterFormsComponent;
  let fixture: ComponentFixture<RegisterFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormsComponent]
    });
    fixture = TestBed.createComponent(RegisterFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
