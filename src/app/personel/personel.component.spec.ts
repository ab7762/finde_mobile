import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelComponent } from './personel.component';

describe('PersonelComponent', () => {
  let component: PersonelComponent;
  let fixture: ComponentFixture<PersonelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonelComponent]
    });
    fixture = TestBed.createComponent(PersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
