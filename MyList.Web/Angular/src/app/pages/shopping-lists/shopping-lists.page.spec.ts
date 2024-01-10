import { ShoppingListBuilder } from './../../test/builders/shopping-list.builder';
import { ShoppingListService } from './../../services/shopping-list.service';
import { DebugElement, Type } from '@angular/core';
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
import { AppRoutes } from 'src/app/models/app-routes';
import { AddListDialogStubComponent, ListOverviewStubComponent } from 'src/app/test/stubs/components';
import { MatDividerModule } from '@angular/material/divider';

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
      declarations: [ ShoppingListsPage, AddListDialogStubComponent, ListOverviewStubComponent ],
      providers: [
        { provide: ShoppingListService, useValue: jasmine.createSpyObj<ShoppingListService>('ShoppingListService', ['getAllShoppingLists', 'removeShoppingList']) },
        { provide: MatDialog, useValue: mockDialog }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: `${AppRoutes.shoppingList.route}/1`, component: {} as Type<any> }
        ]),
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatDividerModule,
      ],
    })
    .compileComponents();

    shoppingListServiceSpy = TestBed.inject(ShoppingListService) as jasmine.SpyObj<ShoppingListService>;
    shoppingListServiceSpy.getAllShoppingLists.and.returnValue(of([mockShoppingList]));
    shoppingListServiceSpy.removeShoppingList.and.returnValue(of(mockShoppingList));
  });

  beforeEach(() => {
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ShoppingListsPage);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init shoppingLists$', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.shoppingLists$).toBeTruthy();
    });
  });

  describe('toggleListAdd', () => {
    it('should call open on dialog', () => {
      // Arrange
      const openSpy = spyOn(component.dialog, 'open');

      // Act
      component.toggleListAdd();

      // Assert
      expect(openSpy).toHaveBeenCalled();
    });
  });

  describe('deleteShoppingLists', () => {
    beforeEach(() => {
      shoppingListServiceSpy.removeShoppingList.calls.reset();
      shoppingListServiceSpy.getAllShoppingLists.calls.reset();
    });

    it('should open dialog component', () => {
      // Arrange
      const openSpy = spyOn(component.dialog, 'open');

      // Act
      component.deleteShoppingList(mockShoppingList);

      // Assert
      expect(openSpy).toHaveBeenCalled();
    });

    it('should call service remove shopping list when dialog accepts an affirmative action', fakeAsync(() => {
      // Arrange
      spyOn(component.dialog, 'open').and.returnValue(
        {afterClosed: () => of(true)} as MatDialogRef<ConfirmationDialogComponent>
      );

      // Act
      component.deleteShoppingList(mockShoppingList);
      flush();

      // Assert
      expect(shoppingListServiceSpy.removeShoppingList).toHaveBeenCalledWith(mockShoppingList.id);
    }));

    it('should call service to get shopping lists after shopping list is removed', fakeAsync(() => {
      // Arrange
      spyOn(component.dialog, 'open').and.returnValue(
        {afterClosed: () => of(true)} as MatDialogRef<ConfirmationDialogComponent>
      );

      // Act
      component.deleteShoppingList(mockShoppingList);
      flush();

      // Assert
      expect(shoppingListServiceSpy.getAllShoppingLists).toHaveBeenCalled();
    }));

    it('should not call any service when dialog accepts a negative action', fakeAsync(() => {
      // Arrange
      spyOn(component.dialog, 'open').and.returnValue(
        {afterClosed: () => of(false)} as MatDialogRef<ConfirmationDialogComponent>
      );

      // Act
      component.deleteShoppingList(mockShoppingList);
      flush();

      // Assert
      expect(shoppingListServiceSpy.removeShoppingList).not.toHaveBeenCalled();
      expect(shoppingListServiceSpy.getAllShoppingLists).not.toHaveBeenCalled();
    }));
  });

  describe('template', () => {
    it('should have a card for shopping list', () => {
      // Act
      const shoppingListCard = de.query(By.css('.card'));

      // Assert
      expect(shoppingListCard).toBeTruthy();
    });

    it('should have a delete button on shopping list card', () => {
      // Act
      const deleteButton = de.query(By.css('#delete-button'));

      // Assert
      expect(deleteButton).toBeTruthy();
    });

    it('should have a add list button', () => {
      // Act
      const addButton = de.query(By.css('#add-list-button'));

      // Assert
      expect(addButton).toBeTruthy();
    });

    it('should display list overview on card', () => {
      // Act
      const listOverview = de.query(By.css('.list-overview'));

      // Assert
      expect(listOverview).toBeTruthy();
    });

    it('should call deleteShoppingList when delete is clicked', () => {
      // Arrange
      const deleteButton = de.query(By.css('#delete-button'));
      const deleteShoppingListSpy = spyOn(component, 'deleteShoppingList');

      // Act
      deleteButton.triggerEventHandler('click', {});

      // Assert
      expect(deleteShoppingListSpy).toHaveBeenCalled();
    });

    it('should route to list details on card click', fakeAsync(() => {
      // Arrange
      const shoppingListCard = de.query(By.css('#card-body'));

      // Act
      shoppingListCard.triggerEventHandler('click', {});
      flush();

      // Assert
      expect(location.path()).toBe(`/${AppRoutes.shoppingList.route}/1`);
    }));

    it('should call toggleListAdd when add button is clicked', () => {
      // Arrange
      const addButton = de.query(By.css('#add-list-button'));
      const toggleListAddSpy = spyOn(component, 'toggleListAdd');

      // Act
      addButton.triggerEventHandler('click', {});

      // Assert
      expect(toggleListAddSpy).toHaveBeenCalled();
    });
  });
});
