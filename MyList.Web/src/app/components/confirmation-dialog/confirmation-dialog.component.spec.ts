import { ConfirmationDialogData } from './models/confirmation-dialog-data';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let de: DebugElement;

  const mockDialogRef = {
    close() { }
  }

  const mockData = {
    message: 'testMessage',
    affirmativeButtonText: 'affirmative',
    affirmativeButtonColor: 'warn',
    negativeButtonText: 'negative',
    negativeButtonColor: 'primary'
  } as ConfirmationDialogData

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    it('should show a message', () => {
      // Act
      const message = de.query(By.css('#message'));

      // Assert
      expect(message).toBeTruthy();
    });

    it('should have a negative button', () => {
      // Act
      const negativeButton = de.query(By.css('#negative-button'));

      // Assert
      expect(negativeButton).toBeTruthy();
    });

    it('should have a affirmative button', () => {
      // Act
      const affirmativeButton = de.query(By.css('#affirmative-button'));

      // Assert
      expect(affirmativeButton).toBeTruthy();
    });

    it('should have passed text on negative button', () => {
      // Arrange
      const negativeButton = de.query(By.css('#negative-button'));

      // Act
      const buttonText = negativeButton.nativeElement.textContent;

      // Assert
      expect(buttonText).toContain(mockData.negativeButtonText);
    });

    it('should have passed text on affirmative button', () => {
      // Arrange
      const affirmativeButton = de.query(By.css('#affirmative-button'));

      // Act
      const buttonText = affirmativeButton.nativeElement.textContent;

      // Assert
      expect(buttonText).toContain(mockData.affirmativeButtonText);
    });

    it('should have passed color on negative button', () => {
      // Arrange
      const negativeButton = de.query(By.css('#negative-button'));

      // Act
      const buttonColor = negativeButton.attributes['ng-reflect-color'];

      // Assert
      expect(buttonColor).toContain(mockData.negativeButtonColor);
    });

    it('should have passed color on affirmative button', () => {
      // Arrange
      const affirmativeButton = de.query(By.css('#affirmative-button'));

      // Act
      const buttonColor = affirmativeButton.attributes['ng-reflect-color'];

      // Assert
      expect(buttonColor).toContain(mockData.affirmativeButtonColor);
    });

    it('should close dialog when affirmative button is clicked', () => {
      // Arrange
      const affirmativeButton = de.query(By.css('#affirmative-button'));
      const dialogSpy = spyOn(component.dialogRef, 'close');

      // Act
      affirmativeButton.triggerEventHandler('click', {});

      // Assert
      expect(dialogSpy).toHaveBeenCalledWith(true);
    });

    it('should close dialog when negative button is clicked', () => {
      // Arrange
      const negativeButton = de.query(By.css('#negative-button'));
      const dialogSpy = spyOn(component.dialogRef, 'close');

      // Act
      negativeButton.triggerEventHandler('click', {});

      // Assert
      expect(dialogSpy).toHaveBeenCalled();
    });
  });


});
