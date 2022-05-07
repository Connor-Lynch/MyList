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
    const item = de.query(By.css('.list-item'));

    expect(item).toBeTruthy();
  });

  it('should show item actions when item is selected', () => {
    const itemToSelect = de.query(By.css('.selectable-item'));

    itemToSelect.triggerEventHandler('click', {});

    const itemActions = de.query(By.css('.item-actions'));

    expect(itemActions).toBeTruthy();
  });

  it('should show add item component', () => {
    const addItem = de.query(By.css('.add-item'));

    expect(addItem).toBeTruthy();
  });

  it('should set selectedItem when and item is clicked', () => {
    const itemInList = de.query(By.css('.selectable-item'));

    itemInList.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedItem).toEqual(mockShoppingListItem);
  });

  it('should unselect item when it is clicked twice', () => {
    let itemInList = de.query(By.css('.selectable-item'));
    itemInList.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedItem).toEqual(mockShoppingListItem);

    itemInList = de.query(By.css('.selectable-item'));
    itemInList.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedItem).toEqual(null);
  });

  it('should show edit form when item under edit is set', () => {
    let editItemForm = de.query(By.css('.edit-item-form'));

    expect(editItemForm).toBeFalsy();

    component.selectedItem = mockShoppingListItem;
    component.itemUnderEdit('1');
    fixture.detectChanges();

    editItemForm = de.query(By.css('.edit-item-form'));

    expect(editItemForm).toBeTruthy();
  });

  it('should set selectedItem and editItemId to null item is no longer under edit', () => {
    component.selectedItem = mockShoppingListItem;
    component.itemUnderEditId = mockShoppingListItem.id;

    component.editEvent(false);

    expect(component.selectedItem).toBeNull();
    expect(component.itemUnderEditId).toBeNull();
  });

  it('should not allow item selection when item is being added', () => {
    component.editEvent(true);

    let itemInList = de.query(By.css('.selectable-item'));
    itemInList.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedItem).not.toEqual(mockShoppingListItem);
  });
});
