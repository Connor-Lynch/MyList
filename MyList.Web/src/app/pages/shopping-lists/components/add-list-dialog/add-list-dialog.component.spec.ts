import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AddListDialogComponent } from './add-list-dialog.component';
import { Type, DebugElement } from '@angular/core';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { of } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutes } from 'src/app/models/app-routes';
import { ShoppingList } from 'src/app/models/shopping-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddItemDialogComponent', () => {
  let component: AddListDialogComponent;
  let fixture: ComponentFixture<AddListDialogComponent>;
  let de: DebugElement;
  let location: Location;
  let shoppingListServiceSpy: jasmine.SpyObj<ShoppingListService>;

  const mockDialogRef = {
    close() { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListDialogComponent ],
      providers: [
        { provide: ShoppingListService, useValue: jasmine.createSpyObj<ShoppingListService>('ShoppingListService', ['addShoppingList']) },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: `${AppRoutes.shoppingList.route}/1`, component: {} as Type<any> }
        ]),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();

    shoppingListServiceSpy = TestBed.inject(ShoppingListService) as jasmine.SpyObj<ShoppingListService>;
  });

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AddListDialogComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init formGroup', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.formGroup).toBeTruthy();
      expect(component.formGroup.controls[component.controlName]).toBeTruthy();
    });
  });

  describe('saveNewList', () => {
    const mockShoppingList = ShoppingListBuilder.create().build();

    beforeEach(() => {
      shoppingListServiceSpy.addShoppingList.and.returnValue(of(mockShoppingList));
    });

    it('should call service to add new list', fakeAsync(() => {
      // Arrange
      const newListName = 'new list name';
      component.formGroup.controls[component.controlName].setValue(newListName);

      // Act
      component.saveNewList();
      flush();

      // Assert
      const expectedRequest: ShoppingList = {
        name: newListName,
        id: null,
        createdDate: null,
        items: null
      };
      expect(shoppingListServiceSpy.addShoppingList).toHaveBeenCalledWith(expectedRequest);
    }));

    it('should navigate to new shopping list', fakeAsync(() => {
      // Arrange
      const newListName = 'new list name';
      component.formGroup.controls[component.controlName].setValue(newListName);

      // Act
      component.saveNewList();
      flush();

      // Assert
      expect(location.path()).toBe(`/${AppRoutes.shoppingList.route}/1`);
    }));

    it('should call cancel if save is called with a null form control value', fakeAsync(() => {
      // Arrange
      component.formGroup.controls[component.controlName].setValue(null);
      const cancelSpy = spyOn(component, 'cancel');

      // Act
      component.saveNewList();
      flush();

      // Assert
      expect(cancelSpy).toHaveBeenCalled();
    }));
  });

  describe('cancel', () => {
    it('should call close on dialog ref', () => {
      // Arrange
      const closeSpy = spyOn(component.dialogRef, 'close');

      // Act
      component.cancel();

      // Assert
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should have a cancel button', () => {
      // Act
      const cancelButton = de.query(By.css('#cancel-button'));

      // Assert
      expect(cancelButton).toBeTruthy();
    });

    it('should have a save button', () => {
      // Act
      const saveButton = de.query(By.css('#save-button'));

      // Assert
      expect(saveButton).toBeTruthy();
    });

    it('should have an add form', () => {
      // Act
      const addForm = de.nativeElement.querySelector('mat-form-field');

      // Assert
      expect(addForm).toBeTruthy();
    });


    it('should call cancel when cancel is clicked', () => {
      // Arrange
      const cancelButton = de.query(By.css('#cancel-button'));
      const cancelSpy = spyOn(component, 'cancel');

      // Act
      cancelButton.triggerEventHandler('click', {});

      // Assert
      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should call saveNewList when cancel is clicked', () => {
      // Arrange
      const saveButton = de.query(By.css('#save-button'));
      const saveNewListSpy = spyOn(component, 'saveNewList');

      // Act
      saveButton.triggerEventHandler('click', {});

      // Assert
      expect(saveNewListSpy).toHaveBeenCalled();
    });
  });
});
