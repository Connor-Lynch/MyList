import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { ItemActionsComponent } from './item-actions.component';

describe('ItemActionsComponent', () => {
  let component: ItemActionsComponent;
  let fixture: ComponentFixture<ItemActionsComponent>;
  let de: DebugElement;

  const mockShoppingListItem = ShoppingListItemBuilder.create().build();
  const mockShoppingList = ShoppingListBuilder.create().withId(mockShoppingListItem.shoppingListId).withItems([mockShoppingListItem]).build();
  const mockShoppingListItemService = {
    updateShoppingListItem() { return of(mockShoppingList) },
    removeShoppingListItem() { return of(mockShoppingList) }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemActionsComponent ],
      providers: [
        { provide: ShoppingListItemService, useValue: mockShoppingListItemService }
      ],
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.item = mockShoppingListItem;
    component.selectedItem = mockShoppingListItem;
    component.shoppingList$ = of(mockShoppingList);

    const formBuilder = new UntypedFormBuilder();
    component.editItemForm = formBuilder.group({
      newItemName: ['']
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show actions if item is equal to item selected', () => {
    const actionsContainer = de.query(By.css('.actions-container'));

    expect(actionsContainer).toBeTruthy();
    expect(component.item).toEqual(component.selectedItem);
  });

  it('should not show actions if item is not equal to item selected', () => {
    component.item = null;
    fixture.detectChanges();

    const actionsContainer = de.query(By.css('.actions-container'));

    expect(actionsContainer).toBeFalsy();
    expect(component.item).not.toEqual(component.selectedItem);
  });

  it('should show edit button', () => {
    const editButton = de.query(By.css('#edit-item-button'));

    expect(editButton).toBeTruthy();
  });

  it('should show delete button', () => {
    const deleteButton = de.query(By.css('#delete-item-button'));

    expect(deleteButton).toBeTruthy();
  });

  it('should disable edit button is item is checked', () => {
    component.item.isChecked = true;
    fixture.detectChanges();

    const editButton = de.query(By.css('#edit-item-button'));

    expect(editButton.attributes['disabled']).toBeTruthy();
  });

  it('should show cancel edit button when edit is clicked', () => {
    const editButton = de.query(By.css('#edit-item-button'));

    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const cancelEditButton = de.query(By.css('#cancel-item-edit-button'));

    expect(cancelEditButton).toBeTruthy();
  });

  it('should show save button when edit is clicked', () => {
    const editButton = de.query(By.css('#edit-item-button'));

    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('#save-item-button'));

    expect(saveButton).toBeTruthy();
  });

  it('should emit item under edit event when edit button is clicked', () => {
    const editButton = de.query(By.css('#edit-item-button'));
    const itemUnderEditEventSpy = spyOn(component.itemUnderEditEvent, 'emit');

    editButton.triggerEventHandler('click', {});

    expect(itemUnderEditEventSpy).toHaveBeenCalledWith(component.itemUnderEditId);
  });

  it('should emit unselected item event when cancel edit button is clicked', () => {
    const editButton = de.query(By.css('#edit-item-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const cancelEditButton = de.query(By.css('#cancel-item-edit-button'));
    const unselectedItemEventSpy = spyOn(component.itemUnselectedEvent, 'emit');

    cancelEditButton.triggerEventHandler('click', {});

    expect(unselectedItemEventSpy).toHaveBeenCalled();
  });

  it('should not call service when save edit is clicked with the same name', () => {
    const editButton = de.query(By.css('#edit-item-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.editItemForm.get('newItemName').setValue(mockShoppingListItem.name);

    const saveButton = de.query(By.css('#save-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'updateShoppingListItem');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should call service when save edit is clicked', () => {
    const editButton = de.query(By.css('#edit-item-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.editItemForm.get('newItemName').setValue('newName');

    const saveButton = de.query(By.css('#save-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'updateShoppingListItem');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should emit updated shopping list when save is clicked', () => {
    const editButton = de.query(By.css('#edit-item-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const shoppingListUpdatedEventSpy = spyOn(component.shoppingListUpdatedEvent, 'emit');

    const saveButton = de.query(By.css('#save-item-button'));

    saveButton.triggerEventHandler('click', {});

    expect(shoppingListUpdatedEventSpy).toHaveBeenCalled();
  });

  it('should call service when delete is clicked', () => {
    const deleteButton = de.query(By.css('#delete-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'removeShoppingListItem');

    deleteButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalledWith('1');
  });

  it('should emit updated shopping list when delete is clicked', () => {
    const shoppingListUpdatedEventSpy = spyOn(component.shoppingListUpdatedEvent, 'emit');

    const deleteButton = de.query(By.css('#delete-item-button'));

    deleteButton.triggerEventHandler('click', {});

    expect(shoppingListUpdatedEventSpy).toHaveBeenCalled();
  });
});
