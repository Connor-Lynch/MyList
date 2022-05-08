import { ShoppingListBuilder } from './../../test/builders/shopping-list.builder';
import { ShoppingListService } from './../../services/shopping-list.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ShoppingListsPage } from './shopping-lists.page';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('ShoppingListsPage', () => {
  let component: ShoppingListsPage;
  let fixture: ComponentFixture<ShoppingListsPage>;
  let de: DebugElement;
  let location: Location;

  const mockShoppingList = ShoppingListBuilder.create().build();
  const mockShoppingListService = {
    getAllShoppingLists() { return of([mockShoppingList]) },
    removeShoppingList() { return of([mockShoppingList])  }
  }

  const mockDialog = {
    open() { }
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListsPage ],
      providers: [
        { provide: ShoppingListService, useValue: mockShoppingListService },
        { provide: MatDialog, useValue: mockDialog }
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

  it('should have a delete button on shopping list card', () => {
    const deleteButton = de.query(By.css('#delete-button'));

    expect(deleteButton).toBeTruthy();
  });

  it('should have a add list button', () => {
    const addButton = de.query(By.css('#add-list-button'));

    expect(addButton).toBeTruthy();
  });

  it('should display list overview on card', () => {
    const listOverview = de.query(By.css('.list-overview'));

    expect(listOverview).toBeTruthy();
  });

  it('should call service when delete is clicked', () => {
    const deleteButton = de.query(By.css('#delete-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'removeShoppingList');

    deleteButton.triggerEventHandler('click', {});

    expect(serviceSpy).toHaveBeenCalledWith('1');
  });

  it('should route to list details on card click', fakeAsync(() => {
    const shoppingListCard = de.query(By.css('#card-body'));

    shoppingListCard.triggerEventHandler('click', {});

    flush();

    expect(location.path()).toBe('/shopping-list-detail/1');
  }));

  it('should open add dialog when add button is clicked', () => {
    const addButton = de.query(By.css('#add-list-button'));
    const dialogSpy = spyOn(component.dialog, 'open');

    addButton.triggerEventHandler('click', {});

    expect(dialogSpy).toHaveBeenCalled();
  });
});
