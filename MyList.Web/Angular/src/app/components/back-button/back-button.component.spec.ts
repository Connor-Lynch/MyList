import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BackButtonComponent } from './back-button.component';
import { MatButtonModule } from '@angular/material/button';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have a back button', () => {
    // Act
    const backButton = de.query(By.css('#back-button'));

    // Assert
    expect(backButton).toBeTruthy();
  });

  it('should navigate back on button click', () => {
    // Arrange
    const backButton = de.query(By.css('#back-button'));
    const locationSpy = spyOn(component.location, 'back');

    // Act
    backButton.triggerEventHandler('click', {});

    // Assert
    expect(locationSpy).toHaveBeenCalled();
  });
});
