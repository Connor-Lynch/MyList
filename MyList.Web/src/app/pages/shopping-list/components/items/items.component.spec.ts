import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { AddItemStubComponent, ItemStubComponent } from 'src/app/test/stubs/components';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { of } from 'rxjs';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let shoppingListItemServiceSpy: jasmine.SpyObj<ShoppingListItemService>;

  const shoppingListId = '1';
  const mockActiveRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        shoppingListId: shoppingListId
      })
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, ItemStubComponent, AddItemStubComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: ShoppingListItemService, useValue: jasmine.createSpyObj<ShoppingListItemService>('ShoppingListItemService', ['addShoppingListItem']) },
      ],
    })
    .compileComponents();

    shoppingListItemServiceSpy = TestBed.inject(ShoppingListItemService) as jasmine.SpyObj<ShoppingListItemService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init listState', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.listState).toBeTruthy();
    });
  });

  describe('writeValue', () => {
    it('should set the form control value to the passed value', () => {
      // Arrange
      const newValue = [
        ShoppingListItemBuilder.create().build(),
        ShoppingListItemBuilder.create().build(),
      ];

      // Act
      component.writeValue(newValue);

      // Assert
      expect(component.itemsControl.value).toEqual(newValue);
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.itemsControl.enable();
    });

    it('should disable form control when true is passed', () => {
      // Act
      component.setDisabledState(true);

      // Assert
      expect(component.itemsControl.disabled).toBeTruthy();
    });

    it('should enabled form control when false is passed', () => {
      // Arrange
      component.itemsControl.disable();

      // Act
      component.setDisabledState(false);

      // Assert
      expect(component.itemsControl.enabled).toBeTruthy();
    });
  });

  describe('itemChanged', () => {
    let onChangeSpy: jasmine.Spy;

    beforeEach(() => (onChangeSpy = jasmine.createSpy()));

    it('should emit control value when called', () => {
      // Arrange
      component.registerOnChange(onChangeSpy);
      const newValue = [
        ShoppingListItemBuilder.create().build(),
        ShoppingListItemBuilder.create().build(),
      ];
      component.writeValue(newValue);

      // Act
      component.itemChanged();

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith(newValue);
    });

    it('should remove all null values from control value when called', () => {
      // Arrange
      component.registerOnChange(onChangeSpy);
      const newValue = [
        ShoppingListItemBuilder.create().build(),
        null,
      ];
      component.writeValue(newValue);

      // Act
      component.itemChanged();

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith([newValue[0]]);
    });
  });

  describe('addNewItem', () => {
    let onChangeSpy: jasmine.Spy;
    const mockShoppingList = ShoppingListBuilder.create()
      .withItems([
        ShoppingListItemBuilder.create().build(),
        ShoppingListItemBuilder.create().build()
      ]).build();

    beforeEach(() => {
      onChangeSpy = jasmine.createSpy();
      shoppingListItemServiceSpy.addShoppingListItem.and.returnValue(of(mockShoppingList));
    });

    it('should call service to add new item', fakeAsync(() => {
      // Arrange
      const newItemName = 'new name';

      // Act
      component.addItem(newItemName);
      flush();

      // Assert
      const expectedRequest: ShoppingListItem = {
        name: newItemName,
        id: null,
        shoppingListId: shoppingListId,
        isChecked: false,
        sortOrder: null,
      };
      expect(shoppingListItemServiceSpy.addShoppingListItem).toHaveBeenCalledWith(expectedRequest);
    }));

    it('should update itemsControls with new items', fakeAsync(() => {
      // Act
      component.addItem('new name');
      flush();

      // Assert
      expect(component.itemsControl.value).toEqual(mockShoppingList.items);
    }));

    it('should emit control value', fakeAsync(() => {
      // Arrange
      component.registerOnChange(onChangeSpy);

      // Act
      component.addItem('new item');

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith(mockShoppingList.items);
    }));
  });

  describe('template', () => {
    it('should render addItem component', () => {
      // Act
      const addItem = fixture.debugElement.nativeElement.querySelector('app-add-item');

      // Assert
      expect(addItem).toBeTruthy();
    });
  });
});
