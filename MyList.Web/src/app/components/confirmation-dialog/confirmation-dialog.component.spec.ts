import { ConfirmationDialogData } from './models/confirmation-dialog-data';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
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

  it('should show a message', () => {
    const message = de.query(By.css('.message'));

    expect(message).toBeTruthy();
  });

  it('should have a negative button', () => {
    const negativeButton = de.query(By.css('#negative-button'));

    expect(negativeButton).toBeTruthy();
  });

  it('should have a affirmative button', () => {
    const affirmativeButton = de.query(By.css('#affirmative-button'));

    expect(affirmativeButton).toBeTruthy();
  });

  it('should have passed text on negative button', () => {
    const negativeButton = de.query(By.css('#negative-button'));

    const buttonText = negativeButton.nativeElement.textContent;

    expect(buttonText).toContain(mockData.negativeButtonText);
  });

  it('should have passed text on affirmative button', () => {
    const affirmativeButton = de.query(By.css('#affirmative-button'));

    const buttonText = affirmativeButton.nativeElement.textContent;

    expect(buttonText).toContain(mockData.affirmativeButtonText);
  });

  it('should have passed color on negative button', () => {
    const negativeButton = de.query(By.css('#negative-button'));

    const buttonColor = negativeButton.attributes['ng-reflect-color'];

    expect(buttonColor).toContain(mockData.negativeButtonColor);
  });

  it('should have passed color on affirmative button', () => {
    const affirmativeButton = de.query(By.css('#affirmative-button'));

    const buttonColor = affirmativeButton.attributes['ng-reflect-color'];

    expect(buttonColor).toContain(mockData.affirmativeButtonColor);
  });

  it('should close dialog when affirmative button is clicked', () => {
    const affirmativeButton = de.query(By.css('#affirmative-button'));
    const dialogSpy = spyOn(component.dialogRef, 'close');

    affirmativeButton.triggerEventHandler('click', {});

    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('should close dialog when negative button is clicked', () => {
    const negativeButton = de.query(By.css('#negative-button'));
    const dialogSpy = spyOn(component.dialogRef, 'close');

    negativeButton.triggerEventHandler('click', {});

    expect(dialogSpy).toHaveBeenCalled();
  });
});
