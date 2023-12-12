import { ShoppingListBuilder } from './../../test/builders/shopping-list.builder';
import { ShoppingListService } from './../../services/shopping-list.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ShoppingListsPage } from './shopping-lists.page';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

describe('ShoppingListsPage', () => {
  let component: ShoppingListsPage;
  let fixture: ComponentFixture<ShoppingListsPage>;
  let de: DebugElement;
  let location: Location;
  let shoppingListServiceSpy: jasmine.SpyObj<ShoppingListService>;

  const mockShoppingList = ShoppingListBuilder.create().build();

  const mockDialog = {
    open() { },
    afterClosed() { }
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListsPage ],
      providers: [
        { provide: ShoppingListService, useValue: jasmine.createSpyObj<ShoppingListService>('ShoppingListService', ['getAllShoppingLists', 'removeShoppingList']) },
        { provide: MatDialog, useValue: mockDialog }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'shopping-list-detail/1', component: {} as Type<any> }
        ]),
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    shoppingListServiceSpy = TestBed.inject(ShoppingListService) as jasmine.SpyObj<ShoppingListService>;
    shoppingListServiceSpy.getAllShoppingLists.and.returnValue(of([mockShoppingList]));
    shoppingListServiceSpy.removeShoppingList.and.returnValue(of(mockShoppingList));
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

  describe('template', () => {
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

    it('should open dialog when delete is clicked', () => {
      const deleteButton = de.query(By.css('#delete-button'));
      const dialogSpy = spyOn(component.dialog, 'open');

      deleteButton.triggerEventHandler('click', {});

      expect(dialogSpy).toHaveBeenCalled();
    });

    it('should call service when delete is clicked and dialog passes affirmative result', () => {
      const deleteButton = de.query(By.css('#delete-button'));
      spyOn(component.dialog, 'open').and.returnValue(
        {afterClosed: () => of(true)} as MatDialogRef<ConfirmationDialogComponent>
      );
      deleteButton.triggerEventHandler('click', {});

      expect(shoppingListServiceSpy.removeShoppingList).toHaveBeenCalledWith('1');
    });

    it('should not call service when delete is clicked and dialog passes negative result', () => {
      const deleteButton = de.query(By.css('#delete-button'));
      spyOn(component.dialog, 'open').and.returnValue(
        {afterClosed: () => of(false)} as MatDialogRef<ConfirmationDialogComponent>
      );

      deleteButton.triggerEventHandler('click', {});

      expect(shoppingListServiceSpy.removeShoppingList).not.toHaveBeenCalled();
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
});
