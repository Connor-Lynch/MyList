import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackButtonComponent ],
      imports: [
        MatIconModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a back button', () => {
    const backButton = de.query(By.css('#back-button'));

    expect(backButton).toBeTruthy();
  });

  it('should navigate back on button click', () => {
    const backButton = de.query(By.css('#back-button'));
    const locationSpy = spyOn(component.location, 'back');

    backButton.triggerEventHandler('click', {});

    expect(locationSpy).toHaveBeenCalled();
  });
});
