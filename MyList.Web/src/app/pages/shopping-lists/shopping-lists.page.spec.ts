import { ShoppingListBuilder } from './../../test/builders/shopping-list.builder';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingListService } from './../../services/shopping-list.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ShoppingListsPage } from './shopping-lists.page';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ShoppingListsPage', () => {
  let component: ShoppingListsPage;
  let fixture: ComponentFixture<ShoppingListsPage>;
  let de: DebugElement;
  let location: Location;

  const mockShoppingList = ShoppingListBuilder.create().build();
  const mockShoppingListService = {
    getAllShoppingLists() { return of([mockShoppingList]) },
    addShoppingList() { },
    removeShoppingList() { return of([mockShoppingList])  }
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListsPage ],
      providers: [
        { provide: ShoppingListService, useValue: mockShoppingListService }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'shopping-list-detail/1', component: {} as Type<any> }
        ]),
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ShoppingListsPage);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a card for shopping list', () => {
    const shoppingListCard = de.query(By.css('.card'));

    expect(shoppingListCard).toBeTruthy();
  });

  it('should have a view button on shopping list card', () => {
    const viewButton = de.query(By.css('#view-button'));

    expect(viewButton).toBeTruthy();
  });

  it('should have a delete button on shopping list card', () => {
    const deleteButton = de.query(By.css('#delete-button'));

    expect(deleteButton).toBeTruthy();
  });

  it('should have a add list button', () => {
    const addButton = de.query(By.css('#add-list-button'));

    expect(addButton).toBeTruthy();
  });

  it('should route to shopping list when view button is clicked', fakeAsync(() => {
    const viewButton = de.query(By.css('#view-button'));

    viewButton.triggerEventHandler('click', {});

    flush();

    expect(location.path()).toBe('/shopping-list-detail/1');
  }));

  it('should call service when delete is clicked', () => {
    const deleteButton = de.query(By.css('#delete-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'removeShoppingList');

    deleteButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalledWith('1');
  });

  it('should show add list card when the add list button is clicked', () => {
    const addButton = de.query(By.css('#add-list-button'));
    let addListForm = de.query(By.css('.add-list-form'));

    expect(addListForm).toBeFalsy();

    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    addListForm = de.query(By.css('.add-list-form'));

    expect(addListForm).toBeTruthy();
  });

  it('should hide add list card when the add list button is clicked twice', () => {
    const addButton = de.query(By.css('#add-list-button'));

    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    let addListForm = de.query(By.css('.add-list-form'));

    expect(addListForm).toBeTruthy();

    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    addListForm = de.query(By.css('.add-list-form'));

    expect(addListForm).toBeFalsy();
  });

  it('should save new list when save new list button is clicked', () => {
    const addButton = de.query(By.css('#add-list-button'));

    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('.save-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'addShoppingList');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should navigate to list detail page after save', fakeAsync(() => {
    const addButton = de.query(By.css('#add-list-button'));

    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('.save-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'addShoppingList').and.returnValue(of(mockShoppingList));

    saveButton.triggerEventHandler('click', {});

    flush();

    expect(location.path()).toBe('/shopping-list-detail/1');
  }));
});
