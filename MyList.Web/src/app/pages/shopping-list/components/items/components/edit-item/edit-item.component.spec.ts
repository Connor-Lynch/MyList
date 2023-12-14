import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemComponent } from './edit-item.component';
import { ActionsStubComponent } from 'src/app/test/stubs/components';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditItemComponent, ActionsStubComponent ],
      imports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init form group', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.formGroup.controls[component.controlName]).toBeTruthy();
    });
  });

  describe('accept', () => {
    it('should emit acceptEvent', () => {
      // Arrange
      const newValue = 'new value';
      const acceptEventSpy = spyOn(component.acceptEvent, 'emit');
      component.formGroup.controls[component.controlName].setValue(newValue);

      // Act
      component.accept();

      // Assert
      expect(acceptEventSpy).toHaveBeenCalledWith(newValue);
    });

    it('should trim white space on emitted item', () => {
      // Arrange
      const newValue = ' new value ';
      const acceptEventSpy = spyOn(component.acceptEvent, 'emit');
      component.formGroup.controls[component.controlName].setValue(newValue);

      // Act
      component.accept();

      // Assert
      expect(acceptEventSpy).toHaveBeenCalledWith(newValue.trim());
    });

    it('should emit declineEvent when control value is empty', () => {
      // Arrange
      const acceptEventSpy = spyOn(component.acceptEvent, 'emit');
      const declineEventSpy = spyOn(component.declineEvent, 'emit');
      component.formGroup.controls[component.controlName].setValue(null);

      // Act
      component.accept();

      // Assert
      expect(acceptEventSpy).not.toHaveBeenCalled();
      expect(declineEventSpy).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should emit declineEvent', () => {
      // Arrange
      const declineEventSpy = spyOn(component.declineEvent, 'emit');

      // Act
      component.cancel();

      // Assert
      expect(declineEventSpy).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should render form field', () => {
      // Act
      const editItem = fixture.debugElement.query(By.css('#edit-name'));

      // Assert
      expect(editItem).toBeTruthy();
    });

    it('should render edit actions', () => {
      // Act
      const actions = fixture.debugElement.query(By.css('#edit-actions'));

      // Assert
      expect(actions).toBeTruthy();
    });
  });
});
