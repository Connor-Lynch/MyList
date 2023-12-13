import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNameComponent } from './list-name.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ActionsStubComponent } from 'src/app/test/stubs/components';

describe('ListNameComponent', () => {
  let component: ListNameComponent;
  let fixture: ComponentFixture<ListNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNameComponent, ActionsStubComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNameComponent);
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
      expect(component.formGroup).toBeTruthy();
      expect(component.formGroup.controls[component.controlName]).toBeTruthy();
    });
  });

  describe('writeValue', () => {
    it('should set the form control value to the passed value', () => {
      // Arrange
      const newValue = 'new value';

      // Act
      component.writeValue(newValue);

      // Assert
      expect(component.formGroup.controls[component.controlName].value).toEqual(newValue);
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.formGroup.enable();
    });

    it('should disable form when true is passed', () => {
      // Act
      component.setDisabledState(true);

      // Assert
      expect(component.formGroup.disabled).toBeTruthy();
    });

    it('should enabled form when false is passed', () => {
      // Arrange
      component.formGroup.disable();

      // Act
      component.setDisabledState(false);

      // Assert
      expect(component.formGroup.enabled).toBeTruthy();
    });
  });

  describe('edit', () => {
    it('should set isEditing to true', () => {
      // Arrange
      component.isEditing = false;

      // Act
      component.edit();

      // Assert
      expect(component.isEditing).toBeTruthy();
    });
  });

  describe('acceptEdit', () => {
    let onChangeSpy: jasmine.Spy;

    beforeEach(() => (onChangeSpy = jasmine.createSpy()));

    it('should set isEditing to false', () => {
      // Arrange
      component.isEditing = true;

      // Act
      component.acceptEdit();

      // Assert
      expect(component.isEditing).toBeFalsy();
    });

    it('should call onChange with new form value', () => {
      // Arrange
      component.registerOnChange(onChangeSpy);
      const newValue = 'new value';
      component.formGroup.controls[component.controlName].setValue(newValue);

      // Act
      component.acceptEdit();

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith(newValue);
    });
  });

  describe('cancelEdit', () => {
    let onChangeSpy: jasmine.Spy;

    beforeEach(() => (onChangeSpy = jasmine.createSpy()));

    it('should set isEditing to false', () => {
      // Arrange
      component.isEditing = true;

      // Act
      component.cancelEdit();

      // Assert
      expect(component.isEditing).toBeFalsy();
    });

    it('should not call onChange', () => {
      // Arrange
      component.registerOnChange(onChangeSpy);
      const newValue = 'new value';
      component.formGroup.controls[component.controlName].setValue(newValue);

      // Act
      component.cancelEdit();

      // Assert
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should reset form control value to pristine value', () => {
      // Arrange
      const pristineValue = 'new value';
      component.formGroup.controls[component.controlName].setValue(pristineValue);
      component.edit();

      component.formGroup.controls[component.controlName].setValue('invalid');

      // Act
      component.cancelEdit();

      // Assert
      expect(component.formGroup.controls[component.controlName].value).toEqual(pristineValue);
    });
  });
});
