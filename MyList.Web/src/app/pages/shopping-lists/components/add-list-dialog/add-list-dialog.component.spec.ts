import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { AddListDialogComponent } from './add-list-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, Type, DebugElement } from '@angular/core';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { of } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('AddItemDialogComponent', () => {
  let component: AddListDialogComponent;
  let fixture: ComponentFixture<AddListDialogComponent>;
  let de: DebugElement;
  let location: Location;

  const mockShoppingList = ShoppingListBuilder.create().build();
  const mockShoppingListService = {
    addShoppingList() { of(mockShoppingList) },
  }

  const mockDialogRef = {
    close() { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListDialogComponent ],
      providers: [
        { provide: ShoppingListService, useValue: mockShoppingListService },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'shopping-list-detail/1', component: {} as Type<any> }
        ])
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
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

  it('should have a cancel button', () => {
    const cancelButton = de.query(By.css('#cancel-button'));

    expect(cancelButton).toBeTruthy();
  });

  it('should have a save button', () => {
    const saveButton = de.query(By.css('#save-button'));

    expect(saveButton).toBeTruthy();
  });

  it('should have a add form', () => {
    const addForm = de.query(By.css('.add-form'));

    expect(addForm).toBeTruthy();
  });

  it('should call close when cancel is clicked', () => {
    const cancelButton = de.query(By.css('#cancel-button'));
    const closeSpy = spyOn(component.dialogRef, 'close');

    cancelButton.triggerEventHandler('click', {});

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should call service when save button is clicked', () => {
    const saveButton = de.query(By.css('#save-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'addShoppingList');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should navigate to list detail page after save', fakeAsync(() => {
    const saveButton = de.query(By.css('#save-button'));
    spyOn(component.shoppingListService, 'addShoppingList').and.returnValue(of(mockShoppingList));

    saveButton.triggerEventHandler('click', {});

    flush();

    expect(location.path()).toBe('/shopping-list-detail/1');
  }));

  it('should close dialog after save', () => {
    const saveButton = de.query(By.css('#save-button'));
    spyOn(component.shoppingListService, 'addShoppingList').and.returnValue(of(mockShoppingList));
    const closeSpy = spyOn(component.dialogRef, 'close');

    saveButton.triggerEventHandler('click', {});

    expect(closeSpy).toHaveBeenCalled();
  });
});
