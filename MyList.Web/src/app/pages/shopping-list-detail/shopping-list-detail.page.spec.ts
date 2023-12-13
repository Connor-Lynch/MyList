import { ShoppingListService } from './../../services/shopping-list.service';
import { ShoppingListItemBuilder } from './../../test/builders/shopping-list-item.builder';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { of } from 'rxjs';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ShoppingListDetailPage } from './shopping-list-detail.page';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

describe('ShoppingListDetailComponent', () => {
  let component: ShoppingListDetailPage;
  let fixture: ComponentFixture<ShoppingListDetailPage>;
  let de: DebugElement;
  let shoppingListServiceSpy: jasmine.SpyObj<ShoppingListService>;
  let shoppingListItemServiceSpy: jasmine.SpyObj<ShoppingListItemService>;

  const mockActiveRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        shoppingListId: '1'
      })
    }
  }

  const mockShoppingListItem = ShoppingListItemBuilder.create().build();
  const mockShoppingList = ShoppingListBuilder.create().withId(mockShoppingListItem.shoppingListId).withItems([mockShoppingListItem]).build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListDetailPage ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: ShoppingListService, useValue: jasmine.createSpyObj<ShoppingListService>('ShoppingListService', ['getShoppingListById']) },
        { provide: ShoppingListItemService, useValue: jasmine.createSpyObj<ShoppingListItemService>('ShoppingListItemService', ['updateShoppingListItem']) }
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatCheckboxModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule
       ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    shoppingListServiceSpy = TestBed.inject(ShoppingListService) as jasmine.SpyObj<ShoppingListService>;
    shoppingListItemServiceSpy = TestBed.inject(ShoppingListItemService) as jasmine.SpyObj<ShoppingListItemService>;

    shoppingListServiceSpy.getShoppingListById.and.returnValue(of(mockShoppingList));
    shoppingListItemServiceSpy.updateShoppingListItem.and.returnValue(of(mockShoppingList));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListDetailPage);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.shoppingList$ = of(mockShoppingList);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    it('should have a back button', () => {
      const backButton = de.nativeElement.querySelector('app-back-button');

      expect(backButton).toBeTruthy();
    });

    it('should display item', () => {
      const item = de.query(By.css('.list-item'));

      expect(item).toBeTruthy();
    });

    it('should display item checkbox', () => {
      const itemCheckbox = de.query(By.css('#item-checkbox-1'));

      expect(itemCheckbox).toBeTruthy();
    });

    it('should disable item checkbox when edit is in progress', () => {
      component.editInProgress = true;
      fixture.detectChanges();

      const itemCheckbox = de.query(By.css('#item-checkbox-1'));

      expect(itemCheckbox.attributes['class']).toContain('mat-mdc-checkbox-disabled');
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

    it('should call service when item is checked', () => {
      const itemCheckbox = de.query(By.css('#item-checkbox-1'));

      itemCheckbox.triggerEventHandler('change', {});

      expect(shoppingListItemServiceSpy.updateShoppingListItem).toHaveBeenCalled();
    });
  });
});
