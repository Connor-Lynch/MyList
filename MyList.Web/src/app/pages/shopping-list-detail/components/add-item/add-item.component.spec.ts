import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { of } from 'rxjs';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let de: DebugElement;

  const mockShoppingListItem = ShoppingListItemBuilder.create().build();
  const mockShoppingList = ShoppingListBuilder.create().withId(mockShoppingListItem.shoppingListId).withItems([mockShoppingListItem]).build();
  const mockShoppingListItemService = {
    addShoppingListItem() { return of(mockShoppingList) }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      providers: [
        { provide: ShoppingListItemService, useValue: mockShoppingListItemService }
      ],
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an add item button', () => {
    const addItemButton = de.query(By.css('.add-item-button'));

    expect(addItemButton).toBeTruthy();
  });

  it('should show add form when add item button is clicked', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    let addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeFalsy();

    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeTruthy();
  });

  it('should disable add button when external edit is taking place', () => {
    component.externalEditInProgress = true;
    fixture.detectChanges();

    const addItemButton = de.query(By.css('.add-item-button'));

    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    let addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeFalsy();
  });

  it('should hide the add form when cancel add button is clicked', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    let addItemForm = de.query(By.css('.add-item-form'));
    expect(addItemForm).toBeTruthy();

    const cancelAddButton = de.query(By.css('#cancel-add-button'));
    cancelAddButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeFalsy();
  });

  it('should emit item being added event add item button is clicked', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    const itemBeingAddedEventSpy = spyOn(component.itemBeingAddedEvent, 'emit');

    addItemButton.triggerEventHandler('click', {});

    expect(itemBeingAddedEventSpy).toHaveBeenCalledWith(true);
  });

  it('should emit item being added event when cancel add button is clicked', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const itemBeingAddedEventSpy = spyOn(component.itemBeingAddedEvent, 'emit');
    const cancelAddButton = de.query(By.css('#cancel-add-button'));
    cancelAddButton.triggerEventHandler('click', {});

    expect(itemBeingAddedEventSpy).toHaveBeenCalledWith(false);
  });

  it('should not call service when save is clicked with empty form value', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('#save-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'addShoppingListItem');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should call service when save is clicked', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.addItemForm.get('itemName').setValue('newItem');

    const saveButton = de.query(By.css('#save-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'addShoppingListItem');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should emit updated shopping list when save is clicked', () => {
    const addItemButton = de.query(By.css('.add-item-button'));
    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.addItemForm.get('itemName').setValue('newItem');

    const saveButton = de.query(By.css('#save-item-button'));
    const shoppingListUpdatedEventSpy = spyOn(component.shoppingListUpdatedEvent, 'emit');

    saveButton.triggerEventHandler('click', {});

    expect(shoppingListUpdatedEventSpy).toHaveBeenCalled();
  });
});
