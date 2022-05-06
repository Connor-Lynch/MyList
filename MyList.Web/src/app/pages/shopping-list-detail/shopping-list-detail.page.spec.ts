import { ShoppingListService } from './../../services/shopping-list.service';
import { ShoppingListItemBuilder } from './../../test/builders/shopping-list-item.builder';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { ShoppingListDetailComponent } from './shopping-list-detail.page';
import { of } from 'rxjs';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ShoppingListDetailComponent', () => {
  let component: ShoppingListDetailComponent;
  let fixture: ComponentFixture<ShoppingListDetailComponent>;
  let de: DebugElement;

  const mockShoppingListItem = ShoppingListItemBuilder.create().build();
  const mockShoppingList = ShoppingListBuilder.create().withId(mockShoppingListItem.shoppingListId).withItems([mockShoppingListItem]).build();
  const mockShoppingListService = {
    getShoppingListById() { return of(mockShoppingList) }
  }
  const mockShoppingListItemService = {
    addShoppingListItem() { return of(mockShoppingList) },
    updateShoppingListItem() { return of(mockShoppingList) },
    removeShoppingListItem() { return of(mockShoppingList) }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListDetailComponent ],
      providers: [
        { provide: ShoppingListService, useValue: mockShoppingListService },
        { provide: ShoppingListItemService, useValue: mockShoppingListItemService }
      ],
      imports: [
        RouterTestingModule,
        FormsModule
       ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item', () => {
    const item = de.query(By.css('#item'));

    expect(item).toBeTruthy();
  });

  it('should have an edit button on item', () => {
    const editItemButton = de.query(By.css('#edit-item-button'));

    expect(editItemButton).toBeTruthy();
  });

  it('should have a delete button on item', () => {
    const deleteItemButton = de.query(By.css('#delete-item-button'));

    expect(deleteItemButton).toBeTruthy();
  });

  it('should have an add item button', () => {
    const addItemButton = de.query(By.css('#add-item-button'));

    expect(addItemButton).toBeTruthy();
  });

  it('should show add form when add item button is clicked', () => {
    const addItemButton = de.query(By.css('#add-item-button'));
    let addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeFalsy();

    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeTruthy();
  });

  it('should hide the add form when add item button is clicked twice', () => {
    const addItemButton = de.query(By.css('#add-item-button'));

    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    let addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeTruthy();

    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    addItemForm = de.query(By.css('.add-item-form'));

    expect(addItemForm).toBeFalsy();
  });

  it('should call service when add is clicked', () => {
    const addItemButton = de.query(By.css('#add-item-button'));

    addItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('.save-new-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'addShoppingListItem');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call service when delete is clicked', () => {
    const deleteButton = de.query(By.css('#delete-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'removeShoppingListItem');

    deleteButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalledWith('1');
  });

  it('should show edit form when edit item button is clicked', () => {
    const editItemButton = de.query(By.css('#edit-item-button'));
    let editItemForm = de.query(By.css('#edit-item-form'));

    expect(editItemForm).toBeFalsy();

    editItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    editItemForm = de.query(By.css('#edit-item-form'));

    expect(editItemForm).toBeTruthy();
  });

  it('should hide the edit form when cancel item edit button is clicked', () => {
    const editItemButton = de.query(By.css('#edit-item-button'));
    editItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    let editItemForm = de.query(By.css('#edit-item-form'));

    expect(editItemForm).toBeTruthy();

    const cancelEditItemButton = de.query(By.css('#cancel-item-edit-button'));
    cancelEditItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    editItemForm = de.query(By.css('#edit-item-form'));

    expect(editItemForm).toBeFalsy();
  });

  it('should call service when save edit is clicked', () => {
    const editItemButton = de.query(By.css('#edit-item-button'));

    editItemButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('#save-item-button'));
    const serviceSpy = spyOn(component.shoppingListItemService, 'updateShoppingListItem');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalled();
  });
});
